/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import React, {FC, ReactNode} from 'react';

export interface Props {
	// name of the file
	name: string;
	readonly children?: ReactNode;
}



const File: FC<Props> = ({name, children}) => {
	return <ink-file name={name}>{children}</ink-file>;
};

File.displayName = 'Ink-File';

export default File;
