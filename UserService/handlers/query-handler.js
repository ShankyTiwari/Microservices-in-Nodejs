const Mongodb = require('./../config/db');

class QueryHandler {
  constructor() {
    this.Mongodb = Mongodb;
  }

  login(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const [DB, ObjectID, DBClient] = await this.Mongodb.onConnect();
        DB.collection('user').findOneAndUpdate(
          data,
          {
            $set: {
              online: 'Y',
            },
          },
          (error, result) => {
            DBClient.close();
            if (error) {
              reject(error);
            }
            result.lastErrorObject.updatedExisting ? resolve(result.value._id) : resolve(null);
          },
        );
      } catch (error) {
        reject(error);
      }
    });
  }


  getUserDetails(userId) {
    return new Promise(async (resolve, reject) => {
      try {
        const [DB, ObjectID, DBClient] = await this.Mongodb.onConnect();
        DB.collection('user').aggregate([
          {
            $match: { _id: ObjectID(userId) },
          },
          {
            $project: {
              name: true,
              email: true,
              lastname: true,
              online: true,
              _id: false,
              id: '$_id',
            },
          },
        ]).toArray((error, result) => {
          DBClient.close();
          if (error) {
            reject(error);
          }
          let userDetails = null;
          if (result.length > 0) {
            userDetails = result[0];
          }
          resolve(userDetails);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  registerUser(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const [DB, ObjectID, DBClient] = await this.Mongodb.onConnect();
        DB.collection('user').insertOne(data, (err, result) => {
          DBClient.close();
          if (err) {
            reject(err);
          }
          resolve(result);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = new QueryHandler();
