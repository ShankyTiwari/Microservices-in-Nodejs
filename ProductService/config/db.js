/*
* Building Micro Services in Nodejs
* @author Shashank Tiwari
*/
'use strict';


/*requiring mongodb node modules */
const mongodb = require('mongodb');
const assert = require('assert');

class DB{

	constructor(){
		this.mongoClient = mongodb.MongoClient;
		this.ObjectID = mongodb.ObjectID;
	}

	onConnect(){
		return new Promise( (resolve, reject) => {
			this.mongoClient.connect(
				`mongodb://127.0.0.1:27017/products`, {
					useNewUrlParser: true
				},
				(err, client) => {
				if (err) {
					reject(err);
				} else {
					assert.equal(null, err);
					resolve([client.db('products'), this.ObjectID, client]);
				}
			});
		});
	}
}
module.exports = new DB();