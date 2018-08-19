import mtg from 'mtgsdk';

const cache = {};

export const getCard = ({name}) => {
	return cache[name] ? Promise.resolve(cache[name]) : getCardList({search:name, exactSearch:true, searchField: 'name', pageSize: 1}).then(
		cards => {
			return cards[0]
		}
	)
}
export const getCardList = ({search='', exactSearch=false, searchField='name', pageSize, colours=[], colourMatch = 'exclusive', type='artifact|creature|enchantment|instant|land|planeswalker|sorcery'}) => {
	const queries = {pageSize, colorIdentity: colours.join(colourMatch === 'exact' ? ',' : '|'), type};

	if(searchField === 'type') queries.type = search;
	else if(searchField === 'text') queries.text = search;
	else queries.name = search;

	return mtg.card.where(queries).then(cards => {
		if (exactSearch && !cards.find(test => {
			return test.name === search
		})) {
			return mtg.card.where({
				...queries,
				pageSize: 50
			}).then(widerCards => {
				const matchName = widerCards.find(test => {
					return test.name === search
				});
				return processCards(matchName ? [matchName] : widerCards[0], colours, colourMatch)
			});
		} else return processCards(cards, colours, colourMatch)
	})
}

const processCards = (cards, colours, colourMatch) => {
	const uniqueCards = cards.filter((card, ind) => {
		return !cards.slice(0, ind).find(test => test.name === card.name);
	})
	uniqueCards.forEach(card => {
		cache[card.name] = card;
	})

	if (colours.length > 0 && (colourMatch === 'exact' || colourMatch === 'exclusive')) {
		return uniqueCards.filter(card => {
			return card.colorIdentity && 
				((colourMatch === 'exact' && card.colorIdentity.length === colours.length) || colourMatch !== 'exact') && 
				card.colorIdentity.every(col => colours.indexOf(col.toLowerCase()) > -1);
		})
	} else return uniqueCards;
}