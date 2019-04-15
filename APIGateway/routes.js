const httpProxy = require('express-http-proxy');

const userServiceProxy = httpProxy('http://localhost:4000');
const productServiceProxy = httpProxy('http://localhost:3000');
const orderServiceProxy = httpProxy('http://localhost:2000');

class Routes {
  constructor(app) {
    this.app = app;
  }

  /* creating app Routes starts */
  appRoutes() {
    this.app.get('/getUserDetails/:userId', (req, res) => {
      userServiceProxy(req, res);
    });

    this.app.post('/register', (req, res) => {
      userServiceProxy(req, res);
    });

    this.app.post('/login', (req, res) => {
      userServiceProxy(req, res);
    });

    this.app.get('/product/:productId', (req, res) => {
      productServiceProxy(req, res);
    });

    this.app.get('/product', (req, res) => {
      productServiceProxy(req, res);
    });


    this.app.post('/order', (req, res) => {
      orderServiceProxy(req, res);
    });

    this.app.get('/order', (req, res) => {
      orderServiceProxy(req, res);
    });
  }

  routesConfig() {
    this.appRoutes();
  }
}

module.exports = Routes;
