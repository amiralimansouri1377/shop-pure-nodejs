const { MongoClient } = require('mongodb');

class MongoDbConnection {
  #DB_URL = 'mongodb://0.0.0.0/shop';
  #DB = null;

  #connect() {
    const client = new MongoClient(this.#DB_URL);
    const db = client.db();
    return db;
  }

  getDB() {
    if (this.#DB) {
      return this.#DB;
    }
    return this.#connect();
  }
}

module.exports = MongoDbConnection;
