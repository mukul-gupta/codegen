import {DOMElement} from './dom.js';

interface Output {
	/**
	 * Element width.
	 */
	width: number;

	/**
	 * Element height.
	 */
	height: number;
}

/**
 * Measure the dimensions of a particular `<Box>` element.
 */
export default (node: DOMElement): Output => ({
	width: node.yogaNode?.getComputedWidth() ?? 0,
	height: node.yogaNode?.getComputedHeight() ?? 0
});
