/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */

import React, {PureComponent, ReactNode} from 'react';
import File from '../components/File.js';
import { ViewScript} from 'ViewScriptNS';
import {Indent} from '../components/Indent.js';
import Text from '../components/Text.js';
import { ButtonScript } from './ButtonScript.js';
import { InputScript } from './inputScript.js';

interface Props {
	readonly children?: ReactNode;
	fileName: string;
	viewScript: ViewScript;
}

// Defines Indent for Text Elements
export class ViewScriptCodeComp extends PureComponent<Props, {}> {
	static displayName = 'ViewScriptCodeGen';

	render() {

		const stepScripts = this.props.viewScript.steps.map(step => {

			if (step.pageElement.type ==  'input') {
				return (
					<InputScript inputStep={step} key={step.step_id}/>
				);
			} else if (step.pageElement.type == 'button') {
				return (
					<ButtonScript inputStep={step} key={step.step_id}/>
				)
			}


		});

		let filenm1 = this.props.fileName + '.js';


		return (
			<React.Fragment>
				<File name={filenm1}>
					<Text>
						// Script for view {this.props.viewScript.name}
					</Text>


					{stepScripts}
					{this.props.children}
				</File>

			</React.Fragment>
		);
	}
}
