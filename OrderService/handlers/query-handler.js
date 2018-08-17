/*
* Building Micro Services in Nodejs
* @author Shashank Tiwari
*/
'use strict';
const axios = require('axios');

const apiHandler = require('./api-handler');

class QueryHandler{

	constructor(){
		this.Mongodb = require("./../config/db");
		this.projectedKeys = {
			"date": true,
			"delivery_date": true,
			"product_details": true,
			"user_details": true,
			'_id': false,
			'orderId': '$_id'
		};
	}

	/*
	* Name of the Method : createOrder
	* Description : Creates a new order in MOngoDB by consuming User Service API and Product Service API
	* Parameter : 
	*		1) userId<string>, productId<string>
	* Return : Promise<OrderID>
	*/
	createOrder(userId, productId) {
		return new Promise( async (resolve, reject) => {
			try {
				const serviceResponse = await axios.all([
					apiHandler.getUserInformation(userId), apiHandler.getProductInformation(productId)
				]);
				const userDetail = serviceResponse[0].data;
				const productDetail = serviceResponse[1].data;
				if( userDetail.error ) {
					reject(`User Service is Down or not Working`);
				} else if (productDetail.error) {
					reject(`Product Service is Down or not Working`);
				} else {
					const orderObject = {
						date: new Date(Date.now()).toISOString(),
						delivery_date: new Date(new Date().getTime() + (24 * 60 * 60 * 1000)).toISOString(),
						product_details: productDetail.details,
						user_details: userDetail.details
					}
					const [DB, ObjectID, DBClient] = await this.Mongodb.onConnect();
					DB.collection('order').insertOne( orderObject , (err, result) => {
						DBClient.close();
						if (err) {
							reject(err);
						}
						resolve(result.insertedId);
					});
				}
			} catch (error) {
				console.log('Error', error);
				reject(error)
			}	
		});
	}

	/*
	* Name of the Method : getOrders
	* Description : Fetchs the list of Orders
	* Parameter : None
	* Return : Promise<OrderDetails>
	*/
	getOrders() {
		return new Promise(async (resolve, reject) => {
			try {
				const [DB, ObjectID, DBClient] = await this.Mongodb.onConnect();
				DB.collection('order').aggregate([{
					$project: this.projectedKeys
				}
				]).toArray((err, result) => {
					DBClient.close();
					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
				});
			} catch (error) {
				reject(error)
			}
		});
	}
}

module.exports = new QueryHandler();
