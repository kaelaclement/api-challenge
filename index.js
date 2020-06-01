const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();

// harry potter api function
const hpApi = require('./lib/harrypotter');
const getCharacters = hpApi.getCharacters;

// nasa api function
const nasaApi = require('./lib/apod');
const getApod = nasaApi.getApod;

// star wars api function
const starwarsApi = require('./lib/starwars');
const sortCharData = starwarsApi.sortCharData;
const getFilmData = starwarsApi.getStarWarsFilm;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.engine('.hbs', hbs({
	defaultLayout: 'layout',
	extname: 'hbs'
}));

app.set('view engine', '.hbs');

app.get('/', (req, res) => {
	res.render('index');
});

app.get('/harrypotter/:house', async (req, res) => {
	let house;
	let template;

	switch (req.params.house) {
		case 'hufflepuffs':
			house = 'Hufflepuff';
			template = req.params.house;
			break;
		case 'ravenclaws':
			house = 'Ravenclaw';
			template = req.params.house;
			break;
		case 'gryffindors':
			house = 'Gryffindor';
			template = req.params.house;
			break;
		case 'slytherins':
			house = 'Slytherin';
			template = req.params.house;
			break;
		default:
			res.send('Error - that is not a harry potter house');
			break;
	}

	let data = await getCharacters(house);

	let students = data.map(student => {
		return student.name;
	});

	res.render(template, { students });
});

app.get('/apod', async (req, res) => {
	let data = await getApod();
	let img = {
		copyright: data.copyright,
		date: data.date,
		explanation: data.explanation,
		title: data.title,
		src: data.url
	}

	res.render('apod', { img });
});

app.get('/starwars', (req, res) => {
	res.render('starwars');
});

app.post('/starwars/character', async (req, res) => {
	let number = req.body.charNum;
	let charResponse = await sortCharData(number);
	res.render('starwars', { charResponse })
});

app.post('/starwars/crawl', async (req, res) => {
	let number = req.body.filmNum;
	let filmResponse = await getFilmData(number);
	let crawl = filmResponse.opening_crawl;
	res.render('starwars', { crawl })
})

app.listen(3000, () => {
	console.log('listening on port 3000');
});