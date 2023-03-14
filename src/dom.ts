import Yoga, {YogaNode} from 'yoga-layout-prebuilt';
import measureText from './measure-text.js';
import applyStyles, {Styles} from './styles.js';
import wrapText from './wrap-text.js';
import squashTextNodes from './squash-text-nodes.js';
import {OutputTransformer} from './render-node-to-output.js';

interface InkNode {
	parentNode: DOMElement | null;
	yogaNode?: Yoga.YogaNode;
	internal_static?: boolean;
	style?: Styles;
}

//TODO-MG
interface CodeGenNode {

	// capturing type as it was not being 'persisted' into model data
	type ?: ElementNames
	parentFileNode? : DOMElement | null;

	// every node can have an indent size including some from parent
	indentSize?:number;

	/**
	 * This includes the inherited indent and the current indent (indentSize)
	 */
	currentSize?:number;

}

export const TEXT_NAME = '#text';
export type TextName = '#text';
export type ElementNames =
	| 'ink-root'
	| 'ink-box'
	| 'ink-text'
	| 'ink-file'
	| 'ink-indent'
	| 'ink-virtual-text';

export type NodeNames = ElementNames | TextName;


//TODO-MG - the DOM element is supplemented with type CodeGenNode to track
// each node's parent File node
// each node can have one and only one output File node that tracks where it is output
export type DOMElement = {
	nodeName: ElementNames;
	attributes: {
		[key: string]: DOMNodeAttribute;
	};
	childNodes: DOMNode[];
	internal_transform?: OutputTransformer;

	// Internal properties
	isStaticDirty?: boolean;
	staticNode?: any;
	onRender?: () => void;
	onImmediateRender?: () => void;
} & InkNode & CodeGenNode;

export type TextNode = {
	nodeName: TextName;
	nodeValue: string;
} & InkNode  & CodeGenNode;

export type DOMNode<T = {nodeName: NodeNames}> = T extends {
	nodeName: infer U;
}
	? U extends '#text'
		? TextNode
		: DOMElement
	: never;

export type DOMNodeAttribute = boolean | string | number;

export const createNode = (nodeName: ElementNames): DOMElement => {
	const node: DOMElement = {
		nodeName,
		style: {},
		attributes: {},
		childNodes: [],
		parentNode: null,
		yogaNode: nodeName === 'ink-virtual-text' ? undefined : Yoga.Node.create()
	};

	if (nodeName === 'ink-text') {
		node.yogaNode?.setMeasureFunc(measureTextNode.bind(null, node));
	}

	return node;
};

export const appendChildNode = (
	node: DOMElement,
	childNode: DOMElement
): void => {
	if (childNode.parentNode) {
		removeChildNode(childNode.parentNode, childNode);
	}

	childNode.parentNode = node;
	node.childNodes.push(childNode);

	if (childNode.yogaNode) {
		node.yogaNode?.insertChild(
			childNode.yogaNode,
			node.yogaNode.getChildCount()
		);
	}

	if (node.nodeName === 'ink-text' || node.nodeName === 'ink-virtual-text') {
		markNodeAsDirty(node);
	}
};

export const insertBeforeNode = (
	node: DOMElement,
	newChildNode: DOMNode,
	beforeChildNode: DOMNode
): void => {
	if (newChildNode.parentNode) {
		removeChildNode(newChildNode.parentNode, newChildNode);
	}

	newChildNode.parentNode = node;

	const index = node.childNodes.indexOf(beforeChildNode);
	if (index >= 0) {
		node.childNodes.splice(index, 0, newChildNode);
		if (newChildNode.yogaNode) {
			node.yogaNode?.insertChild(newChildNode.yogaNode, index);
		}

		return;
	}

	node.childNodes.push(newChildNode);

	if (newChildNode.yogaNode) {
		node.yogaNode?.insertChild(
			newChildNode.yogaNode,
			node.yogaNode.getChildCount()
		);
	}

	if (node.nodeName === 'ink-text' || node.nodeName === 'ink-virtual-text') {
		markNodeAsDirty(node);
	}
};

export const removeChildNode = (
	node: DOMElement,
	removeNode: DOMNode
): void => {
	if (removeNode.yogaNode) {
		removeNode.parentNode?.yogaNode?.removeChild(removeNode.yogaNode);
	}

	removeNode.parentNode = null;

	const index = node.childNodes.indexOf(removeNode);
	if (index >= 0) {
		node.childNodes.splice(index, 1);
	}

	if (node.nodeName === 'ink-text' || node.nodeName === 'ink-virtual-text') {
		markNodeAsDirty(node);
	}
};

export const setAttribute = (
	node: DOMElement,
	key: string,
	value: DOMNodeAttribute
): void => {
	node.attributes[key] = value;
};

export const setStyle = (node: DOMNode, style: Styles): void => {
	node.style = style;

	if (node.yogaNode) {
		applyStyles(node.yogaNode, style);
	}
};

export const createTextNode = (text: string): TextNode => {
	const node: TextNode = {
		nodeName: '#text',
		nodeValue: text,
		yogaNode: undefined,
		parentNode: null,
		style: {}
	};

	setTextNodeValue(node, text);

	return node;
};

const measureTextNode = function (
	node: DOMNode,
	width: number
): {width: number; height: number} {
	const text =
		node.nodeName === '#text' ? node.nodeValue : squashTextNodes(node);

	const dimensions = measureText(text);

	// Text fits into container, no need to wrap
	if (dimensions.width <= width) {
		return dimensions;
	}

	// This is happening when <Box> is shrinking child nodes and Yoga asks
	// if we can fit this text node in a <1px space, so we just tell Yoga "no"
	if (dimensions.width >= 1 && width > 0 && width < 1) {
		return dimensions;
	}

	const textWrap = node.style?.textWrap ?? 'wrap';
	const wrappedText = wrapText(text, width, textWrap);

	return measureText(wrappedText);
};

const findClosestYogaNode = (node?: DOMNode): YogaNode | undefined => {
	if (!node || !node.parentNode) {
		return undefined;
	}

	return node.yogaNode ?? findClosestYogaNode(node.parentNode);
};

const markNodeAsDirty = (node?: DOMNode): void => {
	// Mark closest Yoga node as dirty to measure text dimensions again
	const yogaNode = findClosestYogaNode(node);
	yogaNode?.markDirty();
};

export const setTextNodeValue = (node: TextNode, text: string): void => {
	if (typeof text !== 'string') {
		text = String(text);
	}

	node.nodeValue = text;
	markNodeAsDirty(node);
};
