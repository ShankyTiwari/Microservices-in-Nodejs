/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
const bodyParser = require('body-parser');
const cors = require('cors');
const ExpressConfigModule = require('./express-config');
const JWT = require('./../utils/jwt');

class AppConfig {
  constructor(app) {
    process.on('unhandledRejection', (reason, p) => {
      console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
      // application specific logging, throwing an error, or other logic here
    });
    this.app = app;
  }

  includeConfig() {
    this.loadAppLevelConfig();
    this.loadExpressConfig();
  }

  loadAppLevelConfig() {
    this.app.use(
      bodyParser.json(),
    );
    this.app.use(
      cors(),
    );
  }

  loadExpressConfig() {
    new ExpressConfigModule(this.app).setAppEngine();
    new JWT(this.app).setJWTConfig();
  }
}
module.exports = AppConfig;
