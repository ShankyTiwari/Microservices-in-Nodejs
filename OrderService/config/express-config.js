class ExpressConfig{
	
	constructor(app){
		// Setting .html as the default template extension
		app.set('view engine', 'html');

		// Add more config here
	}
}
module.exports = ExpressConfig;