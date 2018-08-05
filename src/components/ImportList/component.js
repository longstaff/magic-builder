import React from 'react';
import { getCard } from '../../utils/cache';

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

		deck.sections = [
			{
				title: 'Commander',
				cards: cards.filter(card => card.commander)
			}
		];
		deck.length = cards.length;

		return Promise.all(cards.filter(card => !card.commander).map(
			card => getCard({name: card.name})
		)).then(cardData => {
			const instant = [];
			const sorcery = [];
			const creature = [];
			const artifact = [];
			const land = [];
			const enchantment = [];
			const planeswalker = [];
			const unset = [];

			cardData.forEach(card => {
				if (card.types.indexOf("Land") > -1) return land.push(card);
				if (card.types.indexOf("Creature") > -1) return creature.push(card);
				if (card.types.indexOf("Artifact") > -1) return artifact.push(card);
				if (card.types.indexOf("Enchantment") > -1) return enchantment.push(card);
				if (card.types.indexOf("Instant") > -1) return instant.push(card);
				if (card.types.indexOf("Sorcery") > -1) return sorcery.push(card);
				if (card.types.indexOf("Planeswalker") > -1) return planeswalker.push(card);
				return unset.push(card);
			})

			if (instant.length) deck.sections.push({
				title: `Instant (${instant.length})`,
				cards: instant
			})
			if (sorcery.length) deck.sections.push({
				title: `Sorcery (${sorcery.length})`,
				cards: sorcery
			})
			if (creature.length) deck.sections.push({
				title: `Creature (${creature.length})`,
				cards: creature
			})
			if (artifact.length) deck.sections.push({
				title: `Artifact (${artifact.length})`,
				cards: artifact
			})
			if (enchantment.length) deck.sections.push({
				title: `Enchantment (${enchantment.length})`,
				cards: enchantment
			})
			if (planeswalker.length) deck.sections.push({
				title: `Planeswalker (${planeswalker.length})`,
				cards: planeswalker
			})

			deck.sections = [deck.sections[0], ...(deck.sections.slice(1).sort((a,b) => b.cards.length - a.cards.length))];

			if (land.length) deck.sections.push({
				title: `Land (${land.length})`,
				cards: land
			})
			if (unset.length) deck.sections.push({
				title: `Unset (${unset.length})`,
				cards: unset
			})

			return deck;
		})

	}
	const onSubmit = () => parseFields(text.value).then(data => completeImport(data))

	return <div>
		<textarea ref={node => text = node}></textarea>
		<button onClick={onSubmit}>Import</button>
	</div>
}

export default ImportList