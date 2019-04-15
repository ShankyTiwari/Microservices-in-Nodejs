/* eslint-disable no-console */
const express = require('express');
const http = require('http');

const Routes = require('./routes');

class Server {
  constructor() {
    this.app = express();
    this.http = http.Server(this.app);
  }

  /* Including app Routes starts */
  includeRoutes() {
    new Routes(this.app).routesConfig();
  }
  /* Including app Routes ends */

  startTheServer() {
    this.includeRoutes();

    const port = process.env.NODE_SERVER_POST || 8000;
    const host = process.env.NODE_SERVER_HOST || 'localhost';

    this.http.listen(port, host, () => {
      console.log(`Listening on http://${host}:${port}`);
    });
  }
}

module.exports = new Server();