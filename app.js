const express = require('express');
const path = require('path');
const { Client } = require('pg');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const PORT = process.env.PORT || 5000

const client = new Client({
	database: 'dfcu4m50k61tub',
	user: 'kxkzszhbxpyiyj',
	password: '9193147428f280f3e37af583f723085ba714caf33b1f547c8516cd63dbda08e4',
	host: 'ec2-54-204-23-228.compute-1.amazonaws.com',
	port: 5432,
	ssl: true
});

client.connect()
	.then(function() {
		console.log('connected to database!');
	})
	.catch(function() {
		console.log('Error');
	})

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//module 2 starts here
app.get('/brand/create', function(req,res) {
	res.render('brandcreate',{
			data: list,
			title: 'Create a Brand'
	});
});



app.get('/brands', function(req,res) {
	client.query('SELECT * FROM Brands', (req, data)=>{
		var list = [];
		for (var i = 0; i < data.rows.length; i++) {
			list.push(data.rows[i]);
		}
		res.render('brands',{
			data: list,
			title: 'Brand List'
		});
	});
});


app.get('/category/create', function(req,res) {
	res.render('categorycreate',{
			data: list,
			title: 'Create a Category'
	});
});



app.get('/categories', function(req,res) {
	client.query('SELECT * FROM products_category', (req, data)=>{
		var list = [];
		for (var i = 0; i < data.rows.length; i++) {
			list.push(data.rows[i]);
		}
	res.render('brands',{
			data: list,
			title: 'Category List'
	});
	});
});



app.get('/product/create', function(req,res) {
});



app.get('/product/update', function(req,res) {
});











app.get('/', function(req,res) {
	client.query('SELECT * FROM Products', (req, data)=>{
		var list = [];
		for (var i = 0; i < data.rows.length; i++) {
			list.push(data.rows[i]);
		}
		res.render('home',{
			data: list,
			title: 'Product List'
		});
	});
});

app.get('/products/:id', (req,res)=>{
	var id = req.params.id;
	client.query('SELECT * FROM Products', (req, data)=>{
		var list = [];
		for (var i = 0; i < data.rows.length+1; i++) {
			if (i==id) {
				list.push(data.rows[i-1]);
			}
		}
		res.render('products',{
			data: list
		});
	});
});

app.post('/products/:id/send', function(req, res) {
	console.log(req.body);
	var id = req.params.id;
	const output = `
		<p>You have a new contact request</p>
		<h3>Contact Details</h3>
		<ul>
			<li>Customer Name: ${req.body.name}</li>
			<li>Phone: ${req.body.phone}</li>
			<li>Email: ${req.body.email}</li>
			<li>Product Brand: ${req.body.brand}</li>
			<li>Quantity ${req.body.quantity}</li>
		</ul>
	`;

	//nodemailer
	let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'team19dbms@gmail.com', 
            pass: 'team19password' 
        }
    });

    let mailOptions = {
        from: '"Team 19" <team19dbms@gmail.com>',
        to: 'tanjohnloyd3@gmail.com',
        subject: 'Dogs For Sale',
        html: output
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        client.query('SELECT * FROM Products', (req, data)=>{
			var list = [];
			for (var i = 0; i < data.rows.length+1; i++) {
				if (i==id) {
					list.push(data.rows[i-1]);
				}
			}
			res.render('products',{
				data: list,
				msg: '---Email has been sent---'
			});
		});
     });
});


app.listen(3000,function() {
	console.log('Server started at port 3000');
});

app.listen(PORT);
