import { getCard } from './cache';

export const getCommanderTypeSections = cards => {
	return splitCardsToTypeSections(cards.filter(card => !card.commander)).then(sections => [
		{
			title: 'Commander',
			cards: cards.filter(card => card.commander)
		},
		...sections
	]);
}

export const getDataForCards = cards => {
	return Promise.all(cards).then(cardData => Promise.all(cardData.map(
		card => getCard({name: card.name})
	)));
}

export const splitCardsToTypeSections = cards => {
	return getDataForCards(cards).then(cardData => {
		const typeSections = [];

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

		if (instant.length) typeSections.push({
			title: `Instant (${instant.length})`,
			cards: instant
		})
		if (sorcery.length) typeSections.push({
			title: `Sorcery (${sorcery.length})`,
			cards: sorcery
		})
		if (creature.length) typeSections.push({
			title: `Creature (${creature.length})`,
			cards: creature
		})
		if (artifact.length) typeSections.push({
			title: `Artifact (${artifact.length})`,
			cards: artifact
		})
		if (enchantment.length) typeSections.push({
			title: `Enchantment (${enchantment.length})`,
			cards: enchantment
		})
		if (planeswalker.length) typeSections.push({
			title: `Planeswalker (${planeswalker.length})`,
			cards: planeswalker
		})

		const orderedList = typeSections.sort((a,b) => b.cards.length - a.cards.length);

		if (land.length) orderedList.push({
			title: `Land (${land.length})`,
			cards: land
		})
		if (unset.length) orderedList.push({
			title: `Unset (${unset.length})`,
			cards: unset
		})

		return orderedList;
	})

}