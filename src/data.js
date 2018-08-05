const BrowserFS = require('browserfs');
const git = require('isomorphic-git');

let fs;
const dir = '.';

const DELINIATOR = '|';

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


export const init = () => {
	return fs ? Promise.resolve() : new Promise((pass, reject) => {
		BrowserFS.configure({ fs: "LocalStorage", options: {} }, function (err) {
		  if (err) reject(err);
		  fs = BrowserFS.BFSRequire("fs");
		  pass();
		});	
	})
}


export const initRepo = () => {
	return init().then(pass => {
		const repo = getRepo();
		git.init(repo)
			.then(pass => {
				return saveData('Initialise repo', {config: {}, main: [], side: [], maybe: []});
			});
	})
}

export const saveData = (message, {config, main, side, maybe}) => {
	return init().then(pass => {
		const confPromise = writeFile(fs, CONF_FILE, JSON.stringify(config));
		const mainPromise = writeFile(fs, MAIN_FILE, main.join(DELINIATOR));
		const sidePromise = writeFile(fs, SIDE_FILE, side.join(DELINIATOR));
		const maybePromise = writeFile(fs, MAYB_FILE, maybe.join(DELINIATOR));

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
	return init().then(pass => {
		const confPromise = readFile(fs, CONF_FILE);
		const mainPromise = readFile(fs, MAIN_FILE);
		const sidePromise = readFile(fs, SIDE_FILE);
		const maybePromise = readFile(fs, MAYB_FILE);

		return Promise.all([confPromise, mainPromise, sidePromise, maybePromise])
			.then(pass => {
				return {
					config: JSON.parse(pass[0]),
					main: pass[1].split(DELINIATOR),
					side: pass[2].split(DELINIATOR),
					maybe: pass[3].split(DELINIATOR),
				}
			})
	})
}

export const switchBranch = (branchname) => {
	return init().then(pass => {
		const repo = getRepo();
		return git.checkout({
			...repo,
			ref: branchname
		})
	})
}

export const createBranch = (branchname) => {
	return init().then(pass => {
		const repo = getRepo();
		return git.branch({
			...repo,
			ref: branchname
		})
	})
}

export const listBranches = () => {
	return init().then(pass => {
		const repo = getRepo();
		return git.listBranches(repo)
	})
}

export const getBranchData = (branchname) => {
	return switchBranch(branchname).then(pass => retrieveData())
}