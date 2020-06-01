const fetch = require('node-fetch');

const url = `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASAKEY}`

const getApod = async () => {
	let data = await fetch(url);
	let jsonData = await data.json();

	return jsonData;
}

module.exports = {
	getApod
}