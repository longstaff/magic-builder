import * as storage from './storage';
import * as git from './git';
import { getCard } from '../utils/cache'

export const loadFile = (slug, initGit = true) => 
	storage.loadData(slug).then(
		data => {
			if (data) {
				const writePromise = initGit !== false ? git.writeDataToMemory(data) : Promise.resolve();
				return writePromise.then(() => git.retrieveData());
			}
			else {
				const writePromise = initGit !== false ? git.clearMemory() : Promise.resolve();
				return writePromise.then(() => Promise.reject(404));
			}
		},
		err => {
			const writePromise = initGit !== false ? git.clearMemory() : Promise.resolve();
			return writePromise.then(() => Promise.reject(404));
		}
	)

export const saveState = (slug, message, data) => {
	const commander = data.main.cards.filter(card => card.commander);

	const colours = Promise.all(commander.map(card => getCard(card.name))).then(data => {
		const colours = [];
		data.forEach(cardData => {
			cardData.colorIdentity.forEach(colour => {
				if(colours.indexOf(colour) === -1) colours.push(colour);
			});
		});

		return colours;
	})

	return colours.then(data => {
		const summary = {
			title: data.config.name,
			description: data.config.description,
			commander,
			colours: data
		}

		return git.commit(message, data)
			.then(() => git.getMemory())
			.then(saveData => storage.saveSlug(slug, saveData))
	}, err => {
		const summary = {
			title: data.config.name,
			description: data.config.description,
			commander,
		}

		return git.commit(message, data)
			.then(() => git.getMemory())
			.then(saveData => storage.saveSlug(slug, saveData))
	})

}

export const checkSlug = slug => storage.isSlugUsed(slug);

export const getDeckList = slug => storage.getDeckList();

export const initRepo = git.initRepo