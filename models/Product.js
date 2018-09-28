var Product = {

  products: function (client, filter, callback) {
    client.query('SELECT * FROM products ORDER BY products.id', (req, data) => {
      console.log(data.rows);
      callback(data.rows);
    });
  },

  brands: function (client, filter, callback) {
    client.query('SELECT * FROM brands ORDER BY brands.id', (req, data) => {
      console.log(data.rows);
      callback(data.rows);
    });
  },

  categories: function (client, filter, callback) {
    client.query('SELECT * FROM products_category ORDER BY products_category.id', (req, data) => {
      console.log(data.rows);
      callback(data.rows);
    });
  },

  customers: function (client, filter, callback) {
    client.query('SELECT * FROM customers ORDER BY customers.id', (req, data) => {
      console.log(data.rows);
      callback(data.rows);
    });
  }
};

module.exports = Product;
