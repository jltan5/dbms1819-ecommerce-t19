const express = require('express');
const path = require('path');
const { Client } = require('pg');
const port = process.env.PORT || 3000
const exphbs = require('express-handlebars');

// instantiate client using your DB configurations
const client = new Client({
	database: 'dfcu4m50k61tub',
	user: 'kxkzszhbxpyiyj',
	password: '9193147428f280f3e37af583f723085ba714caf33b1f547c8516cd63dbda08e4',
	host: 'ec2-54-204-23-228.compute-1.amazonaws.com',
	port: 5432,
    ssl: true
});
//CREATE TABLE Products(id SERIAL PRIMARY KEY, name varchar(250), type varchar(250), description varchar(250), brand varchar(250), price float(50), pic varchar(250));
//INSERT INTO Products(name, type, description, brand, price, pic) VALUES('Unnamed', 'Working Dogs', 'This distinctive-looking dog breed has a proud, independent spirit that some describe as catlike.', 'Chow Chow', 5000, '/chow.jpg');
//INSERT INTO Products(name, type, description, brand, price, pic) VALUES('Unnamed', 'Companion Dogs', 'The Japanese Spitz is a small family companion with the heart of a large watchdog.', 'Japanese Spitz', 8000, '/spitz.jpg');
//INSERT INTO Products(name, type, description, brand, price, pic) VALUES('Unnamed', 'Companion Dogs', 'His name means little lion, but theres nothing fierce about this dog breed. The Shih Tzu is a lover, not a hunter.', 'Shih Tzu', 9000, '/shih.jpg');
//INSERT INTO Products(name, type, description, brand, price, pic) VALUES('Unnamed', 'Working Dogs', 'The Siberian Husky is a beautiful dog breed with a thick coat that comes in a multitude of colors and markings. Their blue or multi-colored eyes and striking facial masks only add to the appeal of this breed, which originated in Siberia.', 'Siberian Husky', 10000, '/husky.jpg');
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
    res.render('home' , {
    
});
});
//

app.get('/ellaine', function (req, res) {
    res.render('member' , {
    name: 'Ellaine E. Somido',
    email: 'ellainesomido@gmail.com',
    phone: '09150410398',
    imageUrl: 'esomido.jpg',
    hobbies:['Kain', 'Tulog'],
    facebook: 'fb.com/esomido'
});
});

app.get('/johnloyd', function (req, res) {
    res.render('member' , {
    name: 'John Loyd P. Tan',
    email: 'tanjohnloyd3@gmail.com',
    phone: '09150410399',
    imageUrl: 'jltan.jpg' ,
    hobbies:['Aral ', ' Gawaing bahay'],
    facebook: 'fb.com/TanJLP'
});
});



app.get('/products', function(req, res) {
	res.render('products', {
	client.query('SELECT * FROM Products', (req, data)=>{
        var list =[];
        for (var i = 0; i<data.rows.length; i++){
            list.push(data.rows[i]);
	});
});


app.listen(port, function() {
	console.log('Server started at port 3000');
});