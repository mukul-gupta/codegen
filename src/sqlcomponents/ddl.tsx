/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import {Entity} from 'EntityNS';
import React, {PureComponent, ReactNode} from 'react';
import File from '../components/File.js';
import Text from '../components/Text.js';
import {DDLColumn} from './ddlcolumn.js';

interface Props {
	readonly children?: ReactNode;
	fileName: string;
	entity: Entity;
}

// Defines Indent for Text Elements
export class DDL extends PureComponent<Props, {}> {
	static displayName = 'DDLElement';

	render() {
		const table = this.props.entity;
		const attributes = table.Attributes.Attribute.map(attr => {
			return (
				<DDLColumn
					column={attr}
					parentEntity={table}
					key={attr._Name}
				></DDLColumn>
			);
		});

		let filenm1 = this.props.fileName + '.java';
		let filenm2 = this.props.fileName + '_debug.java';

		return (
			<React.Fragment>
				<File name={filenm1}>
					<Text>
						This is a SQL DDL for {table.SingularCaption.__cdata} table
					</Text>


					{attributes}
					{this.props.children}
				</File>
				<File name={filenm2}>
					<Text>
						This is a SQL debug DDL for {table.SingularCaption.__cdata} table
					</Text>

					{attributes}
					{this.props.children}
				</File>
			</React.Fragment>
		);
	}
}
