/*
* Building Micro Services in Nodejs
* @author Shashank Tiwari
*/

'use strict';

const routeHandler = require('./handlers/route-handler');

class Routes{

	constructor(app){
		this.app = app;
	}

	/* creating app Routes starts */
	appRoutes(){
		this.app.post('/order', routeHandler.createOrderRouteHandler);

		this.app.get('/order', routeHandler.getOrdersRouteHandler);

		this.app.get('*', routeHandler.routeNotFoundHandler);		
	}

	routesConfig(){
		this.appRoutes();
	}
}
module.exports = Routes;