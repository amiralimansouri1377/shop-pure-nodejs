const Product = require('../models/product');

const postCreateProduct = (req, res) => {
  let body = '';

  req.on('data', chunk => {
    body += chunk;
  });

  req.on('end', () => {
    const product = { ...JSON.parse(body) };

    Product.create(product)
      .then(msg => {
        res.writeHead(200, { 'Content-Type': 'appilation/json' });
        res.write(
          JSON.stringify({
            product,
            message: msg,
          })
        );
        res.end();
      })
      .catch(err => {
        res.writeHead(400, { 'Content-Type': 'appilation/json' });
        res.write(
          JSON.stringify({
            error: err,
          })
        );
        res.end();
      });
  });
};

const getGetAllProducts = (req, res) => {
  Product.readAll()
    .then(products => {
      console.log(products);
      res.writeHead(200, { 'Content-Type': 'appilation/json' });
      res.write(
        JSON.stringify({
          products,
        })
      );
      res.end();
    })
    .catch(err => {
      res.writeHead(400, { 'Content-Type': 'appilation/json' });
      res.write(
        JSON.stringify({
          error: err,
        })
      );
      res.end();
    });
};

const getGetProductById = (req, res) => {
  const id = req.url.split('/')[3];
  Product.readById(id)
    .then(product => {
      res.writeHead(200, { 'Content-Type': 'appilation/json' });
      res.write(
        JSON.stringify({
          product,
        })
      );
      res.end();
    })
    .catch(err => {
      res.writeHead(400, { 'Content-Type': 'appilation/json' });
      res.write(
        JSON.stringify({
          error: err,
        })
      );
      res.end();
    });
};

const putUpdate = (req, res) => {
  const id = req.url.split('/')[3];

  let body = '';
  req.on('data', chunk => {
    body += chunk;
  });

  req.on('end', () => {
    const payload = { ...JSON.parse(body) };

    Product.update(id, payload)
      .then(msg => {
        res.writeHead(200, { 'Content-Type': 'appilation/json' });
        res.write(
          JSON.stringify({
            message: msg,
          })
        );
        res.end();
      })
      .catch(err => {
        res.writeHead(400, { 'Content-Type': 'appilation/json' });
        res.write(
          JSON.stringify({
            error: err,
          })
        );
        res.end();
      });
  });
};

const deleteRemoveProduct = (req, res) => {
  const id = req.url.split('/')[3];

  Product.remove(id)
    .then(msg => {
      res.writeHead(200, { 'Content-Type': 'appilation/json' });
      res.write(
        JSON.stringify({
          message: msg,
        })
      );
      res.end();
    })
    .catch(err => {
      res.writeHead(400, { 'Content-Type': 'appilation/json' });
      res.write(
        JSON.stringify({
          error: err,
        })
      );
      res.end();
    });
};

module.exports = {
  postCreateProduct,
  getGetAllProducts,
  getGetProductById,
  putUpdate,
  deleteRemoveProduct,
};
