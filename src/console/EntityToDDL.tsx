import { Entity } from 'EntityNS';
import React, { FC, useEffect } from 'react';

import * as catalog from '../../resources/R_BS_CATALOG.json' assert { type: "json" };
;
import useStdout from '../hooks/use-stdout.js';
import { DDL } from '../sqlcomponents/ddl.js';

import {render} from '../index.js'

const mycatalog = catalog.default.DataObject as Entity;

//console.log(mycatalog);



const WriteDDL: FC = () => {
	const {write} = useStdout();

	useEffect(() => {
		write('\n');
	}, []);

	const newline = '\n';

	return (
		<DDL fileName='myFile.DDL' entity={mycatalog}></DDL>
	);
};

//@ts-ignore
const app = render(<WriteDDL />);

(async () => {
	await app.waitUntilExit();
})();
