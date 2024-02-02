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
export class InputScript extends PureComponent<Props, {}> {
	static displayName = 'InputScript';

	render() {
		const step = this.props.inputStep;
		const label = step.pageElement?.label.value_string;
		const action = step.action;
		const valueToFill = step.pageElement.value_string;
		const newline = '\n';

		if (action == 'insert' || action == 'update') {
			return (
				<Indent size={5}>
					<Text>
						{getInsertOrUpdateCodeByLabel(label, valueToFill)}; {newline}
					</Text>
				</Indent>
			);
		} else if (action == 'clear') {
			return (
				<Indent size={5}>
					<Text>
						{getClearCodeByLabel(label)}; {newline}
					</Text>
				</Indent>
			);
		}
	}
}

function getInsertOrUpdateCodeByLabel(label: string, value: string): string {
	return `await page.getByLabel('${label}').fill('${value}')`;
}

function getClearCodeByLabel(label: string): string {
	return `await page.getByLabel('${label}').fill('')`;
}
