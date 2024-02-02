/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import {Step} from 'ViewScriptNS';
import React, {PureComponent, ReactNode} from 'react';
import {Indent} from '../components/Indent.js';
import Text from '../components/Text.js';

interface Props {
	readonly children?: ReactNode;
	inputStep: Step;
}

// Defines Indent for Text Elements
export class ButtonScript extends PureComponent<Props, {}> {
	static displayName = 'ButtonScript';

	render() {
		const step = this.props.inputStep;
		const buttonName = step.pageElement.name;
		const action = step.action;
		const valueToFill = step.pageElement.value_string;
		const newline = '\n';

			return (
				<Indent size={5}>
					<Text>
					{getButtonClickText(buttonName)} {newline}
					</Text>
				</Indent>
			)
		}
	}

function getButtonClickText(name: string): string {

	return `await page.getByRole('button', { name: '${name}'}).click();`;
}

