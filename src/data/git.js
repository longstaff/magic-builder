import { DATA_KEY } from '../constants'
const BrowserFS = require('browserfs');
const git = require('isomorphic-git');
const jsdiff = require('diff');

let fs;
const dir = '.';

const CONF_FILE = 'config.json';
const MAIN_FILE = 'main.md';
const SIDE_FILE = 'side.md';
const MAYB_FILE = 'maybe.md';

const getRepo = () => {
	return {fs, dir};
}
const getAuthor = () => {
	return {name:'admin', email:'admin@email.com'};
}

/*
 JSON to memory and back
 */
const localToJson = () => {
    const json = {};
    let key;
	for (let i=0; localStorage.key(i) !== null; i++) {
		key = localStorage.key(i);
		if(key !== DATA_KEY) json[key] = localStorage.getItem(key);
	}
	return Promise.resolve(json);
}

const jsonToLocal = json => 
	resetData().then(() => {
		Object.entries(json).forEach(([key, val]) => {
			localStorage.setItem(key, val);
		});
		return true;
	});


/*
 Generics
 */
const resetData = () => {
	fs = null;
	const keep = localStorage.getItem(DATA_KEY);
	localStorage.clear();
	localStorage.setItem(DATA_KEY, keep);
	return initFileSystem();
}

const writeFile = (file, title, content) => {
	return new Promise((resolve, reject) => file.writeFile(
	  title,
	  content,
	  {encoding: 'utf8'},
	  (err) => err ? reject(err) : resolve()
	))
}

const readFile = (file, title) => {
	return new Promise((resolve, reject) => file.readFile(
	  title,
	  'utf8',
	  (err, data) => err ? reject(err) : resolve(data)
	))
}

const initFileSystem = () => {
	return fs ? Promise.resolve() : new Promise((pass, reject) => {
		BrowserFS.configure({ fs: "LocalStorage", options: {} }, function (err) {
		  if (err) reject(err);
		  fs = BrowserFS.BFSRequire("fs");
		  pass();
		});	
	})
}

/*
 External
 */
export const writeDataToMemory = (data) => jsonToLocal(data);
export const getMemory = () => localToJson();
export const clearMemory = () => resetData();

export const initRepo = () => {
	resetData();
	return initFileSystem().then(pass => {
		const repo = getRepo();
		git.init(repo)
			.then(pass => {
				return commit('Initialise repo', {config: {}, main: [], side: [], maybe: []});
			});
	})
}

export const commit = (message, {config={}, main=[], side=[], maybe=[]}) => {
	return initFileSystem().then(pass => {
		const confPromise = writeFile(fs, CONF_FILE, JSON.stringify(config));
		const mainPromise = writeFile(fs, MAIN_FILE, JSON.stringify(main));
		const sidePromise = writeFile(fs, SIDE_FILE, JSON.stringify(side));
		const maybePromise = writeFile(fs, MAYB_FILE,JSON.stringify(maybe));

		return Promise.all([confPromise, mainPromise, sidePromise, maybePromise])
			.then(pass => {
				const repo = getRepo();
				return Promise.all([
					git.add({...repo, filepath: CONF_FILE}),
					git.add({...repo, filepath: MAIN_FILE}),
					git.add({...repo, filepath: SIDE_FILE}),
					git.add({...repo, filepath: MAYB_FILE}),
					])
				}
			).then(pass => {
				const repo = getRepo();
				const author = getAuthor();
				return git.commit({
					...repo,
					author,
					message
				})
			})
	})
}

export const retrieveData = () => {
	return initFileSystem().then(pass => {
		const confPromise = readFile(fs, CONF_FILE);
		const mainPromise = readFile(fs, MAIN_FILE);
		const sidePromise = readFile(fs, SIDE_FILE);
		const maybePromise = readFile(fs, MAYB_FILE);

		return Promise.all([confPromise, mainPromise, sidePromise, maybePromise])
			.then(pass => {
				return {
					config: JSON.parse(pass[0]),
					main: JSON.parse(pass[1]),
					side: JSON.parse(pass[2]),
					maybe: JSON.parse(pass[3]),
				}
			})
	})
}

export const getHistory = (branchname) => {
	return initFileSystem().then(pass => {
		const repo = getRepo();
		return git.log({...repo, depth: 5}).then(commits => {
			return Promise.all(commits.map(commit => {
				const current = git.readObject({...repo, oid: commit.oid, filepath: MAIN_FILE});
				const old = commit.parent[0] ? 
					git.readObject({...repo, oid:commit.parent[0] , filepath: MAIN_FILE}):
					Promise.resolve({})

				return Promise.all([old, current])
					.then(data => {
						const old = data[0].object ? data[0].object.toString('utf8') : '';
						const current = data[1].object ? data[1].object.toString('utf8') : '';

						let added = [];
						let removed = [];

						if(old && current) {
							jsdiff.diffArrays(JSON.parse(old), JSON.parse(current), {
								comparator: (l,r) => l.name === r.name
							}).forEach(res => {
								if(res.added) added.push(...res.value);
								if(res.removed) removed.push(...res.value);
							});

						}

						return {
							...commit,
							diff: {added, removed}
						}
					})
			}))
		})
	})
}

export const switchBranch = (branchname) => {
	return initFileSystem().then(pass => {
		const repo = getRepo();
		return git.checkout({
			...repo,
			ref: branchname
		})
	})
}

export const createBranch = (branchname) => {
	return initFileSystem().then(pass => {
		const repo = getRepo();
		return git.branch({
			...repo,
			ref: branchname
		})
	})
}

export const listBranches = () => {
	return initFileSystem().then(pass => {
		const repo = getRepo();
		return git.listBranches(repo)
	})
}

export const getBranchData = (branchname) => {
	return switchBranch(branchname).then(pass => retrieveData())
}