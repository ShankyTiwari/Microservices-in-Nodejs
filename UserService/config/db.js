const mongodb = require('mongodb');
const redis = require('redis');

class MongoDB {
  constructor() {
    this.mongoClient = mongodb.MongoClient;
    this.ObjectID = mongodb.ObjectID;
  }

  onConnect() {
    return new Promise((resolve, reject) => {
      this.mongoClient.connect(
        process.env.MONGODB_DB_URL, {
          useNewUrlParser: true,
        },
        (err, client) => {
          if (err) {
            reject(err);
          } else {
            resolve([client.db('users'), this.ObjectID, client]);
          }
        },
      );
    });
  }
}
module.exports.MongoDB = new MongoDB();
module.exports.redisClient = redis.createClient();
