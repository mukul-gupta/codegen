/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import {Attribute, Entity} from 'EntityNS';
import React, {PureComponent, ReactNode} from 'react';
import Box from '../components/Box.js';
import {Indent} from '../components/Indent.js';
import Text from '../components/Text.js';

interface Props {
	readonly children?: ReactNode;
	column: Attribute;
	parentEntity: Entity;
}

// Defines Indent for Text Elements
export class DDLColumn extends PureComponent<Props, {}> {
	static displayName = 'DDLColumn';

	render() {
		const table = this.props.parentEntity;
		const column = this.props.column;
		const newline = '\n';

		return (
			<Indent size={5}>
				<Text>
					column is {column._Name}; {newline}
				</Text>
			</Indent>
		);
	}
}
