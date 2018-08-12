import { DATA_KEY } from '../constants'
import { dataMap } from './tempData';

/*
	Generics
*/
const getData = () => {
	const data = localStorage.getItem(DATA_KEY);
	return data && JSON.parse(data) ? JSON.parse(data) : dataMap;
}
const setData = json => {
	localStorage.setItem(DATA_KEY, JSON.stringify(json));
}

/*
	Exportable uses
*/
export const loadData = slug => {
	const json = getData();
	return Promise.resolve(json[slug] ? json[slug] : null);
}
export const saveSlug = (slug, data) => {
	setData({
		...getData(),
		[slug]: data
	});
	return Promise.resolve(true);
}
export const deleteSlug = slug => {
	setData({
		...getData(),
		[slug]: undefined
	});
	return Promise.resolve(true);
}
export const isSlugUsed = slug => {
	const json = getData();
	return Promise.resolve(!!json[slug]);
}
export const getDeckList = slug => {
	const json = getData();
	return Promise.resolve(Object.keys(json));
}