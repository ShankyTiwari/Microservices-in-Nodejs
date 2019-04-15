const routeHandler = require('./handlers/route-handler');

class Routes {
  constructor(app) {
    this.app = app;
  }

  /* creating app Routes starts */
  appRoutes() {
    this.app.post('/register', routeHandler.registerRouteHandler);
    this.app.post('/login', routeHandler.loginRouteHandler);
    this.app.get('/user/:userId', routeHandler.getUserDetailsHandler);
    this.app.get('*', routeHandler.routeNotFoundHandler);
  }

  routesConfig() {
    this.appRoutes();
  }
}
module.exports = Routes;
