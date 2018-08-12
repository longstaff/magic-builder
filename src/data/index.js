import * as storage from './storage';
import * as git from './git';

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
	return git.commit(message, data)
		.then(() => git.getMemory())
		.then(saveData => storage.saveSlug(slug, saveData))
}

export const checkSlug = slug => storage.isSlugUsed(slug);

export const getDeckList = slug => storage.getDeckList();

export const initRepo = git.initRepo