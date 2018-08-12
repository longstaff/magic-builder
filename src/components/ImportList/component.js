import React from 'react';

const ImportList = ({ completeImport }) => {
	let text = null

	const parseFields = input => (
		input.split(/\n/g).map(line => {
			const results = /(\d+)x (.+?)(#.+)?( \*CMDR\*)?$/.exec(line);
			const output = [];

			if(results) {
				const count = +results[1];
				const name = results[2];

				for (let i = 0; i < count; i++) {
					output.push({name: name, commander: !!results[4]});
				}
			}
			return output;
		}).reduce((all, next) => [...all, ...next], [])
	)

	const onSubmit = () => completeImport(parseFields(text.value))

	return <div>
		<textarea ref={node => text = node}></textarea>
		<button onClick={onSubmit}>Import</button>
	</div>
}

export default ImportList