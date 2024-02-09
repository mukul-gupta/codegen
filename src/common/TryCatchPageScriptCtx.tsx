/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import {Step} from 'ViewScriptNS';
import React, {Fragment, PureComponent, ReactNode} from 'react';
import {Indent} from '../components/Indent.js';
import Text from '../components/Text.js';
import {forEach} from 'benchmark';

interface Props {
	readonly children?: ReactNode;
}

// Try catch with view script context
export class TryCatchViewScriptCtx extends PureComponent<Props, {}> {
	static displayName = 'TryCatch';

	render() {
		const newline = '\n';
		const braceBegin = `{`;
		const braceEnd = `}`;

		return (
			<Fragment>
				<Indent size={3}>
					<Text>try {braceBegin}</Text>
					<Indent size={3}>{this.props.children}</Indent>
					<Text>
						{braceEnd} catch(e) {braceBegin} {newline}{newline}{braceEnd}
					</Text>
				</Indent>
			</Fragment>
		);
	}
}
