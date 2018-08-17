/*
* Building Micro Services in Nodejs
* @author Shashank Tiwari
*/
'use strict';

class QueryHandler{

	constructor(){
		this.Mongodb = require("./../config/db");
		this.projectedKeys = {
			"name": true,
			"price": true,
			"description": true,
			"image": true,
			"sku": true,
			'_id': false,
			'id': '$_id'
		};
	}

	/*
	* Name of the Method : getProductDetail
	* Description : Fetchs the product  details using product id
	* Parameter : 
	*		1) product Id<string>
	* Return : Promise<ProductDetail>
	*/
	getProductDetail(productId) {
		return new Promise( async (resolve, reject) => {
			try {
				const [DB, ObjectID, DBClient] = await this.Mongodb.onConnect();
				DB.collection('product').aggregate([
					{
						$match: { '_id': ObjectID(productId) }
					},
					{
						$project: this.projectedKeys
					}
				]).toArray( (error, result) => {
					DBClient.close();
					if( error ){
						reject(error);
					}
					let userDetails = null;
					if (result.length > 0) {
						userDetails = result[0];
					}
					resolve(userDetails);
				});
			} catch (error) {
				reject(error)
			}	
		});
	}

	/*
	* Name of the Method : getProductDetail
	* Description : Fetchs the lis of products
	* Parameter : None
	* Return : Promise<ProductDetail>
	*/
	getProducts() {
		return new Promise(async (resolve, reject) => {
			try {
				const [DB, ObjectID, DBClient] = await this.Mongodb.onConnect();
				DB.collection('product').aggregate([{
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
