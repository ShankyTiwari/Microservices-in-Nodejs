class ExpressConfig {
  constructor(app) {
    this.app = app;
  }

  setAppEngine() {
    this.app.set('view engine', 'html');
  }
}
module.exports = ExpressConfig;
