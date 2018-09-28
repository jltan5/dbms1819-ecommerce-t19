var Product = {

  list: function (client, filter, callback) {
    const productListQuery = `
      SELECT * 
      FROM products 
      ORDER BY products.id
    `;
    client.query(productListQuery, (req, data) => {
      console.log(data.rows);
      callback(data.rows);
    });
  }
};

module.exports = Product;
