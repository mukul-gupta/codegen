import {ReactNode, Key, LegacyRef} from 'react';
import {Except} from 'type-fest';
import { INDENT_TYP } from './components/Indent';
import {DOMElement} from './dom';
import {Styles} from './styles';

declare global {
	namespace JSX {
		interface IntrinsicElements {
			'ink-box': Ink.Box;
			'ink-text': Ink.Text;
			'ink-file':Ink.File;
			'ink-indent':Ink.Indent;

		}
	}
}

declare namespace Ink {

	// every element will pass through the indent size and type
	interface CommonElement {
		children?: ReactNode;
		indentSize?: number;
		indentType?: INDENT_TYP
	}


	interface Box extends CommonElement {
		//children?: ReactNode;
		key?: Key;
		ref?: LegacyRef<DOMElement>;
		style?: Except<Styles, 'textWrap'>;
	}

	interface Text extends CommonElement{
		//children?: ReactNode;
		key?: Key;
		style?: Styles;
		internal_transform?: (children: string) => string;
	}

	interface File extends CommonElement{
		//children?: ReactNode;
		name: string;
	}


	interface Indent extends CommonElement {

	}


}
