import React from 'react';

const ImportList = ({ completeImport }) => {
	let text = null

	const parseFields = input => {
		const deck = {
			title: 'Imported deck'
		}

		const lines = input.split(/\n/g);
		const cards = lines.map(line => {
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

		deck.cards = cards;
		return deck;
	}
	
	const onSubmit = () => parseFields(text.value).then(data => completeImport(data))

	return <div>
		<textarea ref={node => text = node}></textarea>
		<button onClick={onSubmit}>Import</button>
	</div>
}

export default ImportList