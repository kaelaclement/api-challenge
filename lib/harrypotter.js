const fetch = require('node-fetch');

const getCharacters = async (house) => {
	const url = `https://www.potterapi.com/v1/characters?key=${process.env.HPKEY}&house=${house}`
	let data = await fetch(url);
	let jsonData = await data.json();

	return jsonData;
}

module.exports = {
	getCharacters
}