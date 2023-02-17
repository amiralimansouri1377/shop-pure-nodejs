const http = require('http');

const productControllers = require('./controllers/products');

http
  .createServer((req, res) => {
    const { url, method } = req;

    if (url === '/api/products' && method === 'POST') {
      productControllers.postCreateProduct(req, res);
    } else if (url === '/api/products' && method === 'GET') {
      productControllers.getGetAllProducts(req, res);
    } else if (url.match(/\/api\/products\/\d+/) && method === 'GET') {
      productControllers.getGetProductById(req, res);
    } else if (url.match(/\/api\/products\/\d+/) && method === 'PUT') {
      productControllers.putUpdate(req, res);
    } else if (url.match(/\/api\/products\/\d+/) && method === 'DELETE') {
      productControllers.deleteRemoveProduct(req, res);
    }
  })
  .listen(3000);
