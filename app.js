const express = require('express');
const path = require('path');
const { Client } = require('pg');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const moment = require('moment');
const PORT = process.env.PORT || 5000;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const client = new Client({
  database: 'dfcu4m50k61tub',
  user: 'kxkzszhbxpyiyj',
  password: '9193147428f280f3e37af583f723085ba714caf33b1f547c8516cd63dbda08e4',
  host: 'ec2-54-204-23-228.compute-1.amazonaws.com',
  port: 5432,
  ssl: true
});

client.connect()
  .then(function () {
    console.log('connected to database!');
  })
  .catch(function () {
    console.log('Error');
  });

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var Product = require('./models/product');
// var Brand = require('./models/brand');
// var Category = require('./models/category');
// var Order = require('./models/order');
// var Customer = require('./models/customer');

app.get('/user', function (req, res) {
  Product.products(client, {}, function (list) {
    res.render('user', {
      data: list,
      title: 'PRODUCT LIST'
    });
  });
});

app.get('/admin', function (req, res) {
  Product.products(client, {}, function (list) {
    res.render('home', {
      data: list,
      title: 'PRODUCT LIST'
    });
  });
});

app.get('/brands', function (req, res) {
  Product.brands(client, {}, function (list1) {
    res.render('brands', {
      data: list1,
      title: 'Brand List'
    });
  });
});

app.get('/categories', function (req, res) {
  Product.categories(client, {}, function (list2) {
    res.render('categories', {
      data: list2,
      title: 'Category List'
    });
  });
});

app.get('/customers', function (req, res) {
  Product.customers(client, {}, function (list3) {
    res.render('customers', {
      data: list3,
      title: 'Customer List'
    });
  });
});

app.get('/product/create', (req, res) => {
  Product.categories(client, {}, function (list4) {
    Product.brands(client, {}, function (list5) {
      res.render('productcreate', {
        data: list4,
        data2: list5,
        title: 'Create Product'
      });
    });
  });
});

app.get('/product/update/:id', (req, res) => {
  client.query('SELECT * FROM products_category', (req, data) => {
    var list2 = [];
    for (var i = 1; i < data.rows.length + 1; i++) {
      list2.push(data.rows[i - 1]);
    }
    client.query('SELECT * FROM brands', (req, data) => {
      var list3 = [];
      for (var i = 1; i < data.rows.length + 1; i++) {
        list3.push(data.rows[i - 1]);
      }
      res.render('update', {
        category: list2,
        brands: list3,
        title: 'Update Product'
      });
    });
  });
});

app.get('/products/:id', (req, res) => {
  console.log(req.body);
  var id = parseInt(req.params.id);
  client.query('SELECT products.id, products.name, products.description, products.tagline, products.price, products.warranty, products.image, products.category_id, products_category.category_name, products.brand_id, brands.brand_name FROM products INNER JOIN products_category ON products.category_id = products_category.id INNER JOIN brands ON products.brand_id = brands.id ORDER BY products.id', (req, data) => {
    var list = [];
    for (var i = 0; i < data.rows.length + 1; i++) {
      if (i === id) {
        list.push(data.rows[i - 1]);
      }
    }
    res.render('products', {
      data: list
    });
  });
});

app.get('/orders', (req, res) => {
  client.query('SELECT * FROM orders', (req, data) => {
    var list = [];
    for (var i = 1; i < data.rows.length + 1; i++) {
      list.push(data.rows[i - 1]);
    }
    res.render('orders', {
      data: list
    });
  });
});

app.get('/login', function (req, res) {
  res.render('login');
});

app.get('/brand/create', function (req, res) {
  res.render('brandcreate', {
    title: 'Create a Brand'});
});

app.get('/register', function (req, res) {
  res.render('register');
});

app.get('/category/create', function (req, res) {
  res.render('categorycreate', {
    title: 'Create a Category'});
});

app.get('/', function (req, res) {
  res.render('index');
});

app.post('/admin', function (req, res) {
  var values = [];
  values = [req.body.product_name, req.body.product_description, req.body.product_tagline, req.body.product_price, req.body.product_warranty, req.body.category_id, req.body.brand_id, req.body.image_link];
  console.log(req.body);
  console.log(values);
  client.query('SELECT name FROM products', (req, data) => {
    var list;
    var exist = 0;
    console.log('compare');
    for (var i = 0; i < data.rows.length; i++) {
      list = data.rows[i].name;
      console.log(list);
      if (list === values[0]) {
        exist = 1;
      }
    }
    if (exist === 1) {
      res.render('invalid');
    } else {
      console.log(values);
      client.query('INSERT INTO products(name, description, tagline, price, warranty, category_id, brand_id, image) VALUES($1, $2, $3, $4, $5, $6, $7, $8)', values, (err, res) => {
        if (err) {
          console.log(err.stack);
        } else {
          console.log(res.rows[0]);
        }
      });
      res.redirect('/admin');
    }
  });
});

app.post('/brands', function (req, res) {
  var values = [];
  values = [req.body.brand_name, req.body.brand_description];
  var values1 = [];
  values1 = [req.body.brand_name];
  console.log(req.body);
  console.log(values);
  client.query('SELECT brand_name FROM brands', (req, data) => {
    var list;
    var exist = 0;
    console.log(values1);
    console.log('compare');
    for (var i = 0; i < data.rows.length; i++) {
      list = data.rows[i].brand_name;
      console.log(list);
      if (list === values1) {
        exist = 1;
      }
    }
    if (exist === 1) {
      res.render('invalid');
    } else {
      console.log(values);
      client.query('INSERT INTO brands(brand_name, description) VALUES($1, $2)', values, (err, res) => {
        if (err) {
          console.log(err.stack);
        } else {
          console.log(res.rows[0]);
        }
      });
      res.redirect('/brands');
    }
  });
});

app.post('/login', function (req, res) {
  console.log(req.body);
  res.render('login');
});

app.post('/register', function (req, res) {
  console.log(req.body);
  res.render('register');
});

app.post('/categories', function (req, res) {
  var values = [];
  values = [req.body.category_name];
  console.log(req.body);
  console.log(values);
  client.query('SELECT category_name FROM products_category', (req, data) => {
    var list;
    var exist = 0;
    console.log(values);
    console.log('compare');
    for (var i = 0; i < data.rows.length; i++) {
      list = data.rows[i].category_name;
      console.log(list);
      if (list === values) {
        exist = 1;
      }
    }
    if (exist === 1) {
      res.render('invalid');
    } else {
      console.log(values);
      client.query('INSERT INTO products_category(category_name) VALUES($1)', values, (err, res) => {
        if (err) {
          console.log(err.stack);
        } else {
          console.log(res.rows[0]);
        }
      });
      res.redirect('/categories');
    }
  });
});

app.post('/products/:id', function (req, res) {
  console.log(req.body);
  var id = parseInt(req.params.id);
  var values = [];
  values = [req.body.product_id, req.body.product_name, req.body.product_description, req.body.product_tagline, req.body.product_price, req.body.product_warranty, req.body.image_link, req.body.category_id, req.body.brand_id];
  console.log(values);
  client.query('UPDATE products SET name = $2, description = $3, tagline = $4, price = $5, warranty = $6, image = $7, category_id = $8, brand_id = $9 WHERE id = $1', values);
  res.redirect('/description/' + id);
});

app.get('/description/:id', (req, res) => {
  var id = parseInt(req.params.id);
  client.query('SELECT products.id, products.name, products.description, products.tagline, products.price, products.warranty, products.image, products.category_id, products_category.category_name, products.brand_id, brands.brand_name FROM products INNER JOIN products_category ON products.category_id = products_category.id INNER JOIN brands ON products.brand_id = brands.id', (req, data) => {
    var listz = [];
    for (var i = 0; i < data.rows.length + 1; i++) {
      if (i === id) {
        listz.push(data.rows[i - 1]);
      }
    }
    res.render('description', {
      data: listz
    });
    console.log(data);
  });
});

app.get('/customers/:id', (req, res) => {
  var id = req.params.id;
  console.log(id);
  client.query('SELECT orders.id, orders.customer_id, orders.product_id, orders.order_date, orders.quantity, customers.email, customers.first_name, customers.last_name, customers.street, customers.municipality, customers.province, customers.zipcode, products.name FROM orders INNER JOIN customers ON orders.customer_id = customers.id INNER JOIN products ON orders.product_id = products.id WHERE orders.customer_id = $1', [id], (err, data) => {
    if (err) {
      console.log(err);
    } else {
      var list5 = [];
      console.log(data.rows);
      for (var i = 1; i < data.rows.length + 1; i++) {
        list5.push(data.rows[i - 1]);
      }// data.rows[0];
      res.render('customer_detail', {
        data: list5,
        first_name: list5[0].first_name,
        last_name: list5[0].last_name,
        customer_id: list5[0].customer_id,
        email: list5[0].email,
        street: list5[0].street,
        municipality: list5[0].municipality,
        province: list5[0].province,
        zipcode: list5[0].zipcode

      });
    }
  });
});

app.post('/products/:id/send', function (req, res) {
  console.log(req.body);
  var id = req.params.id;
  var orderDate = moment().format('llll [GMT+8]');
  var email = req.body.email;
  var customersValues = [req.body.email, req.body.fname, req.body.lname, req.body.street, req.body.municipality, req.body.province, req.body.zipcode];
  var ordersValues = [req.body.product_id, req.body.quantity, orderDate];
  const output1 = `
    <p>Your Order Request has been sent to the seller!</p>
    <h3>Order Details</h3>
    <ul>
      <li>Customer Name: ${req.body.fname} ${req.body.lname}</li>
      <li>Email: ${req.body.email}</li>
      <li>Address: ${req.body.street} ${req.body.municipality} ${req.body.province} ${req.body.zipcode}</li>
      <li>Product ID: ${req.body.product_id}</li>
      <li>Quantity: ${req.body.quantity}</li>
    </ul>
  `;
  const output2 = `
    <p>You have a new Order Request!</p>
    <h3>Order Details</h3>
    <ul>
      <li>Customer Name: ${req.body.fname} ${req.body.lname}</li>
      <li>Email: ${req.body.email}</li>
      <li>Address: ${req.body.street} ${req.body.municipality} ${req.body.province} ${req.body.zipcode}</li>
      <li>Product ID: ${req.body.product_id}</li>
      <li>Quantity: ${req.body.quantity}</li>
    </ul>
  `;

  client.query('SELECT email FROM customers', (req, data) => {
    var list;
    var exist = 0;
    console.log(email);
    console.log('comparing');
    for (var i = 0; i < data.rows.length; i++) {
      list = data.rows[i].email;
      console.log(list);
      if (list === email) {
        exist = 1;
      }
    }

    if (exist === 1) {
      console.log('email exists');
      client.query('SELECT id FROM customers WHERE email=$1', [email], (err, data) => {
        if (err) {
          console.log(err.stack);
        } else {
          console.log(data.rows);
          console.log('got customer id');
          ordersValues[3] = data.rows[0].id;
          console.log(ordersValues + '<====');
          client.query('INSERT INTO orders(product_id, quantity, order_date, customer_id) VALUES($1, $2, $3, $4)', ordersValues, (req, data) => {
            let transporter = nodemailer.createTransport({
              host: 'smtp.gmail.com',
              port: 465,
              secure: true,
              auth: {
                user: 'team19dbms@gmail.com',
                pass: 'team19password'
              }
            });

            let mailOptions1 = {
              from: '"Team 19" <team19dbms@gmail.com>',
              to: email,
              subject: 'Web App Module 3',
              html: output1
            };

            let mailOptions2 = {
              from: '"Team 19" <team19dbms@gmail.com>',
              to: 'tanjohnloyd3@gmail.com',
              subject: 'Web App Module 3',
              html: output2
            };

            transporter.sendMail(mailOptions1, (error, info) => {
              if (error) {
                return console.log(error);
              }
              console.log('Message sent: %s', info.messageId);
              console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            });

            transporter.sendMail(mailOptions2, (error, info) => {
              if (error) {
                return console.log(error);
              }
              console.log('Message sent: %s', info.messageId);
              console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            });
          });
          res.redirect('/products/' + id + '/send');
        }
      });
    } else {
      console.log('not exist');
      console.log(customersValues);
      client.query('INSERT INTO customers(email, first_name, last_name, street, municipality, province, zipcode) VALUES($1, $2, $3, $4, $5, $6, $7)', customersValues, (err, data) => {
        if (err) {
          console.log(err.stack);
        } else {
          client.query('SELECT lastval()', (err, data) => {
            if (err) {
              console.log(err.stack);
            } else {
              console.log(data.rows);
              console.log('got customer id');
              ordersValues[3] = data.rows[0].lastval;
              console.log(ordersValues + '<====');
              client.query('INSERT INTO orders(product_id, quantity, order_date, customer_id) VALUES($1, $2, $3, $4)', ordersValues, (req, data) => {
                let transporter = nodemailer.createTransport({
                  host: 'smtp.gmail.com',
                  port: 465,
                  secure: true,
                  auth: {
                    user: 'team19dbms@gmail.com',
                    pass: 'team19password'
                  }
                });

                let mailOptions1 = {
                  from: '"Team 19" <team19dbms@gmail.com>',
                  to: email,
                  subject: 'WebApp Module 3',
                  html: output1
                };

                let mailOptions2 = {
                  from: '"Team 19" <team19dbms@gmail.com>',
                  to: 'tanjohnloyd3@gmail.com',
                  subject: 'WebApp Module 3',
                  html: output2
                };

                transporter.sendMail(mailOptions1, (error, info) => {
                  if (error) {
                    return console.log(error);
                  }
                  console.log('Message sent: %s', info.messageId);
                  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                });

                transporter.sendMail(mailOptions2, (error, info) => {
                  if (error) {
                    return console.log(error);
                  }
                  console.log('Message sent: %s', info.messageId);
                  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                });
              });
              res.redirect('/products/' + id + '/send');
            }
          });
        }
      });
    }
  });
});

app.get('/products/:id/send', function (req, res) {
  var id = req.params.id;
  res.render('email', {
    message: 'Email Sent!',
    PID: id
  });
});

app.listen(3000, function () {
  console.log('Server started at port 3000');
});

app.listen(PORT);
