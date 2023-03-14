import Yoga from 'yoga-layout-prebuilt';
//import widestLine from 'widest-line';
import indentString from 'indent-string';
//import wrapText from './wrap-text';
//import getMaxWidth from './get-max-width';
import { DOMElement, TextNode } from './dom.js';
import { writeTextToFile } from './ink.js';
import Output from './output.js';
import renderBorder from './render-border.js';
import squashTextNodes from './squash-text-nodes.js';

// If parent container is `<Box>`, text nodes will be treated as separate nodes in
// the tree and will have their own coordinates in the layout.
// To ensure text nodes are aligned correctly, take X and Y of the first text node
// and use it as offset for the rest of the nodes
// Only first node is taken into account, because other text nodes can't have margin or padding,
// so their coordinates will be relative to the first node anyway
//@ts-ignore
const applyPaddingToText = (node: DOMElement, text: string): string => {
	const yogaNode = node.childNodes[0]?.yogaNode;

	if (yogaNode) {
		const offsetX = yogaNode.getComputedLeft();
		const offsetY = yogaNode.getComputedTop();
		text = '\n'.repeat(offsetY) + indentString(text, offsetX);
	}

	return text;
};

export type OutputTransformer = (s: string) => string;

// After nodes are laid out, render each to output object, which later gets rendered to terminal
const renderNodeToOutput = (
	node: DOMElement,
	output: Output,
	options: {
		offsetX?: number;
		offsetY?: number;
		transformers?: OutputTransformer[];
		skipStaticElements: boolean;
	}
) => {
	const {
		offsetX = 0,
		offsetY = 0,
		transformers = [],
		skipStaticElements
	} = options;

	//TODO-MG
	//console.log(' type of node === ' + node.nodeName);

	if (skipStaticElements && node.internal_static) {
		return;
	}

	const {yogaNode} = node;

	if (yogaNode) {
		if (yogaNode.getDisplay() === Yoga.DISPLAY_NONE) {
			return;
		}

		// Left and top positions in Yoga are relative to their parent node
		const x = offsetX + yogaNode.getComputedLeft();
		const y = offsetY + yogaNode.getComputedTop();

		// Transformers are functions that transform final text output of each component
		// See Output class for logic that applies transformers
		let newTransformers = transformers;

		if (typeof node.internal_transform === 'function') {
			newTransformers = [node.internal_transform, ...transformers];
		}

		if (node.nodeName === 'ink-text') {
			let text = squashTextNodes(node);


			var indentSizeOfTextNode = 0

			//@ts-ignore
			indentSizeOfTextNode =   node.currentSize;

			if (indentSizeOfTextNode === undefined || indentSizeOfTextNode <0 ) {
				indentSizeOfTextNode = 0
			}

			// writing to file
			writeTextToFile(text, node!.parentFileNode as DOMElement, indentSizeOfTextNode);

			//TODO-MG  commented out output to stdout
			// if (text.length > 0) {
			// 	const currentWidth = widestLine(text);
			// 	const maxWidth = getMaxWidth(yogaNode);

			// 	if (currentWidth > maxWidth) {
			// 		//TODO-MG
			// 		const textWrap = node?.style?.textWrap ?? 'wrap';
			// 		text = wrapText(text, maxWidth, textWrap);
			// 	}

			// 	text = applyPaddingToText(node, text);
			// 	output.write(x, y, text, {transformers: newTransformers});
			// }

			return;
		}

		if (node.nodeName === 'ink-box') {
			renderBorder(x, y, node, output);
		}

		if (node.nodeName === 'ink-file') {
			setParentChildNodeforAllChildNodes(node, node);
		}

		// pass down indent to all child nodes when processing root node itself
		if (node.nodeName === 'ink-root') {
			setIndentForAllNodes(node,0)
		}

		// if (node.nodeName === 'ink-root' ||
		//  node.nodeName === 'ink-box' ||
		//   node.nodeName === 'ink-file') {

		// this will happen for any type of node other than a text node
		for (const childNode of node.childNodes) {
			renderNodeToOutput(childNode as DOMElement, output, {
				offsetX: x,
				offsetY: y,
				transformers: newTransformers,
				skipStaticElements
			});
		}
	}
};

/**
 * Recursively sets the file node for all child node
 * @param node
 * @param parentFileNode
 * @returns
 */
const setParentChildNodeforAllChildNodes = (
	node: DOMElement | TextNode,
	parentFileNode: DOMElement
) => {
	// short circuit the recursive call if text node
	if (node.nodeName === 'ink-text') {
		//set parent file node and return as this is text leaf node
		node.parentFileNode = parentFileNode;
		return;
	}

	/**
	 * At this stage the node may be a file node
	 *
	 * init it to parent file node
	 */
	var fileNode = parentFileNode;

	if (node.nodeName === 'ink-file') {
		fileNode = node;
	}

	// this is guaranteed as we have handled TextNode and returned above
	var currNode = node as DOMElement;

	// at this stage - we have 'fileNode' refer to a file node
	// we can iterate through all the children
	for (const childNode of currNode.childNodes) {
		childNode.parentFileNode = fileNode;

		setParentChildNodeforAllChildNodes(childNode, fileNode);
	}
};


/**
 * Recursively cascades down the indent size from the root node to all nodes and especially
 * the text nodes
 * @param node
 * @param parentFileNode
 * @returns
 */
const setIndentForAllNodes = (
	node: DOMElement | TextNode,
	baseIndentSize: number
) => {

	// short circuit the recursive call if text node
	if (node.nodeName === 'ink-text') {

		//set both indent size and current indent size to base indent size
		node.indentSize = baseIndentSize;
		node.currentSize = baseIndentSize;
		return;
	}

	/**
	 * At this stage the node may be a file node
	 *
	 * init it to base indent node
	 */
	var currentIndentSize = baseIndentSize;

	if (node.nodeName === 'ink-indent') {

		// set the current indent size to what was already passed plus
		// what is read from the node

		if ( node.attributes['indentSize'] !== undefined && node.attributes['indentSize'] > 0) {


			node.indentSize =  node.attributes['indentSize'] as number; // read from node

            currentIndentSize = baseIndentSize +node.indentSize;

			node.currentSize = currentIndentSize;
		}

	} else {
		// we are assured that the current node ('node') is neither a text node (end of processing)
		// nor am indent node
		// we just need to update the currentSize of the node with value
		node.currentSize = currentIndentSize;
	}

	// we have ensured that Text node is already accounted for the we short circuit
	// we are assured of a DomElement
    var currNode = node as DOMElement;

	// at this stage - we have 'fileNode' refer to a file node
	// we can iterate through all the children
	for (const childNode of currNode.childNodes) {

		// this will annotate all child nodes
		setIndentForAllNodes(childNode,currentIndentSize);
	}
};

export default renderNodeToOutput;
