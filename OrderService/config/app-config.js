/*
* Building Micro Services in Nodejs
* @author Shashank Tiwari
*/
'use strict';

const expressConfig = require('./express-config');
const bodyParser = require('body-parser');
const cors = require('cors');

class AppConfig{
	
	constructor(app){
		process.on('unhandledRejection', (reason, p) => {
		  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
		  // application specific logging, throwing an error, or other logic here
		});
		this.app = app;
	}

	includeConfig() {
		this.app.use(
            bodyParser.json()
        );
        this.app.use(
        	cors()
        );        
		new expressConfig(this.app);
	}

}
module.exports = AppConfig;