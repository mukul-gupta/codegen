/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import React, {PureComponent, ReactNode} from 'react';



export enum INDENT_TYP {
	INDENT_TYPE_TAB = "\t",
	INDENT_TYPE_SPACE = " "
  }



interface Props {

	readonly children?: ReactNode;
	readonly size: number;
	readonly type?: INDENT_TYP;

}




// Defines Indent for Text Elements
export  class Indent extends PureComponent<Props, {}> {
	static displayName = 'IndentElement';


	render() {
		return (
			<ink-indent indentSize={this.props.size}>{this.props.children}</ink-indent>

		);
	}




}
