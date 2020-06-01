const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');
const app = express();
require('dotenv').config();

// harry potter api function
const hpApi = require('./lib/harrypotter');
const getCharacters = hpApi.getCharacters;

// nasa api function
const nasaApi = require('./lib/apod');
const getApod = nasaApi.getApod;

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
})

app.listen(3000, () => {
	console.log('listening on port 3000');
});