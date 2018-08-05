import mtg from 'mtgsdk';

const cache = {};

export const getCard = ({name}) => {
	return cache[name] ? Promise.resolve(cache[name]) : mtg.card.where({name}).then(
		cards => {
			cache[name] = cards[0];
			return cache[name]
		}
	)
}