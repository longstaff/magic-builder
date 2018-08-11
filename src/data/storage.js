export const localToJson = () => {
    const json = {};
    let key, i=0;
	for (; key = window.localStorage.key(i); i++) {
	    json[key] = window.localStorage.getItem(key);
	}
	return json
}

export const jsonToLocal = (json) => {
	window.localStorage.clear();

	Object.entries(json).forEach(([key, val]) => {
		window.localStorage.setItem(key, val);
	});

	return true;
}