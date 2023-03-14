import React, {FC, useEffect} from 'react';
import {useStdout, Box, render, Text, File} from '../../src/index.js';
import {Indent} from '../../src/components/Indent.js';
//import {render, useStdout, Text, Box, File,Indent} from '../..';

const WriteToStdout: FC = () => {
	const {write} = useStdout();

	useEffect(() => {
		write('\n');
	}, []);

	const newline = '\n';

	return (
		<Box>
			<File name="myfile22.java">
				<Indent size={3}>
					<Box>
						<Text>Checking offset {newline}for first indent</Text>
					</Box>

					<Indent size={5}>
						<Box>
							<Text>
								Hello World this {newline}
								is the text
							</Text>
						</Box>
					</Indent>
				</Indent>

				<Box>
					<Text>This is also in the first file</Text>
					<Text>This is also in the first file 2</Text>
				</Box>
			</File>

			<File name="myfile.java">
				<Indent size={3}>
					<Indent size={5}>
						<Indent size={5}>
							<Box>
								<Text>
									Hello World this {newline}
									is the text
								</Text>
							</Box>
						</Indent>
					</Indent>
				</Indent>
			</File>
		</Box>
	);
};

//@ts-ignore
const app = render(<WriteToStdout />);

(async () => {
	await app.waitUntilExit();
})();
