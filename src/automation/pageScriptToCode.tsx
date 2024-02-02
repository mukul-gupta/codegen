
import React, { FC, useEffect } from 'react';

import * as view_script from '../../resources/page_2_script.json' assert { type: "json" };
;
import useStdout from '../hooks/use-stdout.js';


import {render} from '../index.js'
import { ViewScript } from 'ViewScriptNS';
import { ViewScriptCodeComp } from './viewComp.js';

const current_viewscript = view_script.default as ViewScript;





const WritePageScript: FC = () => {
	const {write} = useStdout();

	useEffect(() => {
		write('\n');
	}, []);

	const newline = '\n';

	return (
		<ViewScriptCodeComp fileName='myFile' viewScript={current_viewscript}></ViewScriptCodeComp>
	);
};

//@ts-ignore
const app = render(<WritePageScript />);

(async () => {
	await app.waitUntilExit();
})();
