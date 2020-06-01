const fetch = require('node-fetch');

const getStarWarsCharacter = async (number) => {
	let data = await fetch(`https://swapi.dev/api/people/${number}/`);
	return await data.json();
}

const sortCharData = async (number) => {
	let data = await getStarWarsCharacter(number);
	let response = {
		name: data.name,
		height: data.height,
		DOB: data.birth_year
	}
	return response;
}

const getStarWarsFilm = async (number) => {
	let data = await fetch(`https://swapi.dev/api/films/${number}`);
	return await data.json();
}

module.exports = {
	sortCharData,
	getStarWarsFilm
}