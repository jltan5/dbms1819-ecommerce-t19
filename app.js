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





















//module 2 starts HERE

app.get('/brand/create', function (req, res) {
 res.render('brandcreate',{
 	title: 'Create a Brand'});
});


app.post('/brands', function(req,res) {
	var values =[];
	values = [req.body.brand_name,req.body.brand_description];
	console.log(req.body);
	console.log(values);
	client.query("INSERT INTO brands(brand_name, description) VALUES($1, $2)", values, (err, res)=>{
		if (err) {
			console.log(err.stack)
			}
		else {
			console.log(res.rows[0])
		}
	});
	res.redirect('/brands');
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

app.get('/category/create', function (req, res) {
 res.render('categorycreate',{
 	title: 'Create a Category'});
});



app.post('/categories', function(req,res) { 
	var values =[];
	values = [req.body.category_name];
	console.log(req.body);
	console.log(values);
	client.query("INSERT INTO products_category(category_name) VALUES($1)", values, (err, res)=>{
		if (err) {
			console.log(err.stack)
			}
		else {
			console.log(res.rows[0])
		}
	});
	res.redirect('/categories');
});




app.get('/categories', function(req,res) {
	client.query('SELECT * FROM products_category', (req, data)=>{
		var list = [];
		for (var i = 0; i < data.rows.length; i++) {
			list.push(data.rows[i]);
		}
	res.render('categories',{
			data: list,
			title: 'Category List'
	});
	});
});



app.get('/product/create', (req,res)=>{	//CREATE PRODUCT html
	client.query('SELECT * FROM products_category', (req, data)=>{
		var list = [];
		for (var i = 1; i < data.rows.length+1; i++) {
				list.push(data.rows[i-1]);
		}
		client.query('SELECT * FROM brands', (req, data)=>{
			var list2 = [];
			for (var i = 1; i < data.rows.length+1; i++) {
					list2.push(data.rows[i-1]);
			}
			res.render('productcreate',{
				data: list,
				data2: list2
			});
		});
	});
});



app.post('/', function(req,res) {
	var values =[];
	values = [req.body.product_name,req.body.product_description,req.body.product_tagline,req.body.product_price,req.body.product_warranty,req.body.category_id,req.body.brand_id,req.body.image_link];
	console.log(req.body);
	console.log(values);
	client.query("INSERT INTO products(name, description, tagline, price, warranty, category_id, brand_id, image) VALUES($1, $2, $3, $4, $5, $6, $7, $8)", values, (err, res)=>{
		if (err) {
			console.log(err.stack)
			}
		else {
			console.log(res.rows[0])
		}
	});
	res.redirect('/');
});



app.get('/product/update/:id', (req,res)=>{	//CREATE PRODUCT html
	var id = req.params.id;
	client.query('SELECT * FROM products_category', (req, data)=>{
		var list = [];
		for (var i = 1; i < data.rows.length+1; i++) {
				list.push(data.rows[i-1]);
		}
		client.query('SELECT * FROM brands', (req, data)=>{
			var list2 = [];
			for (var i = 1; i < data.rows.length+1; i++) {
					list2.push(data.rows[i-1]);
			}
			res.render('update',{
				data: list,
				data2: list2,
				title: 'Brand List'
			});
		});
	});
});



app.post('/', function(req,res) {
	var id = req.params.id;
	var values =[];
	values = [req.body.product_name,req.body.product_description,req.body.product_tagline,req.body.product_price,req.body.product_warranty,req.body.category_id,req.body.brand_id,req.body.image_link];
	console.log(req.body);
	console.log(values);
	client.query("UPDATE products SET name = $1", values, (err, res)=>{
		if (err) {
			console.log(err.stack)
			}
		else {
			console.log(res.rows[0])
		}
	});
	res.redirect('/');
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



//SELECT products.brand_id AS user, brands.name AS favorite FROM brands JOIN products ON products.product_brand = brands.id

app.get('/products/:id', (req,res)=>{
	var id = req.params.id;
	client.query('SELECT products.id, products.name, products.description, products.tagline, products.price, products.warranty, products.image, products.category_id, products_category.category_name, products.brand_id, brands.brand_name FROM products INNER JOIN products_category ON products.category_id = products_category.id INNER JOIN brands ON products.brand_id = brands.id ORDER BY products.id' , (req, data)=>{
		var list = [];
		//console.log(data);
		for (var i = 0; i < data.rows.length+1; i++) {
			if (i==id) {
				list.push(data.rows[i-1]);
			}
		}
		//console.log(list);
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
