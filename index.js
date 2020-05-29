const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.engine('.hbs', hbs({
	defaultLayout: 'layout',
	extname: 'hbs'
}));

app.set('view engine', '.hbs');

app.get('/', (req, res) => {
	res.render('index');
});

app.listen(3000, () => {
	console.log('listening on port 3000');
});