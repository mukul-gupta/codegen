/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import { Entity } from 'EntityNS';
import React, {PureComponent, ReactNode} from 'react';
import File from '../components/File.js';
import Text from '../components/Text.js';
import { DDLColumn } from './ddlcolumn.js';


interface Props {

	readonly children?: ReactNode;
	fileName:string,
	entity:Entity

}




// Defines Indent for Text Elements
export  class DDL extends PureComponent<Props, {}> {
	static displayName = 'DDLElement';


	render() {

		const table = this.props.entity
        const attributes = table.Attributes.Attribute.map((attr) => {
			return <DDLColumn column={attr} parentEntity={table} key={attr._Name}></DDLColumn>
		})

		return (

			<File name={this.props.fileName}>
				<Text> This is a place holder for {table.SingularCaption.__cdata}</Text>

                {attributes}
				{this.props.children}

			</File>


		);
	}




}
