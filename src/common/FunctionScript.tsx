/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import {Step} from 'ViewScriptNS';
import React, {Fragment, PureComponent, ReactNode} from 'react';
import {Indent} from '../components/Indent.js';
import Text from '../components/Text.js';
import {forEach} from 'benchmark';

/**
 * Assuming function params name are only needed as javascript code output
 */
export type FunctionFormalParamName = string;

interface Props {
	readonly children?: ReactNode;
	function_name: string;
	params: FunctionFormalParamName[];
}

// Defines Indent for Text Elements
export class FunctionScript extends PureComponent<Props, {}> {
	static displayName = 'FunctionScript';

	render() {
		const function_name = this.props.function_name + 'Script';
		const params = this.props.params;

		const newline = '\n';
		const braceBegin = `{`;
		const braceEnd = `}`;

		return (
			<Fragment>
				<Text>async function {function_name}({getParamNameList(params)}) {braceBegin}</Text>
                <Text>{newline}</Text>
				{this.props.children}
				<Text>{braceEnd}</Text>
			</Fragment>
		);
	}
}


function getParamNameList(params: FunctionFormalParamName[]): string {
	let retString = '';

	for (let index = 0; index < params.length; index++) {
		const element = params[index];

		// prefix a comma if not first element
		if (index > 0) {
			retString = retString.concat(',');
		}

		retString = retString.concat(element);
	}
	return retString;
}
