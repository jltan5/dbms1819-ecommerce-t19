const express = require('express');
const path = require('path');
const { Client } = require('pg');
const port = process.env.PORT || 3000
const exphbs = require('express-handlebars');

// instantiate client using your DB configurations
const client = new Client({
	database: 'd3jhms46r8qvej',
	user: 'jbksyojpidykte',
	password: 'ec3b5866d91f53e4b43e57d9290b41938a62ef053d332731d6be2ed58cac4ce5',
	host: 'ec2-54-204-23-228.compute-1.amazonaws.com',
	port: 5432
});

// connect to database
client.connect()
	.then(function() {
		console.log('connected to database!')
	})
	.catch(function(err) {
		console.log('cannot connect to database!')
	});

const app = express();
// tell express which folder is a static/public folder
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


app.get('/', function (req, res) {
    res.render('member' , {
    name: 'Bimbim',
    email: '2016-2018',
    phone: 'chicken lover',
    imageUrl: 'bim.jpg',
    hobbies:['Sleeping', 'Running', 'Eating'],
    facebook: 'Loved'
});
});


app.get('/ellaine1', function (req, res) {
    res.render('member' , {
    name: 'Ellaine E. Somido',
    email: 'ellainesomido@gmail.com',
    phone: '09150410398',
    imageUrl: 'esomido.jpg',
    hobbies:['Kain', 'Tulog'],
    facebook: 'fb.com/esomido'
});
});

app.get('/johnloyd1', function (req, res) {
    res.render('member' , {
    name: 'John Loyd P. Tan',
    email: 'tanjohnloyd3@gmail.com',
    phone: '09150410399',
    imageUrl: 'jltan.jpg' ,
    hobbies:['Aral ', ' Gawaing bahay'],
    facebook: 'fb.com/TanJLP'
});
});


app.get('/handle', function (req, res) {
    res.render('home');
});

app.get('/file', function(req, res) {
	res.sendFile(__dirname + '/ellaine.html');
});

app.get('/home', function(req, res) {
	res.send('<h1>Welcome</h1>');
});

app.get('/products', function(req, res) {
	res.render('products', {
	title: 'Top Products'
	});
});


app.listen(port, function() {
	console.log('Server started at port 3000');
});