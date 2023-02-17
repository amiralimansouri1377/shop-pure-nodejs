const { ObjectId } = require('mongodb');
const MongoDbConnection = require('../utils/database');
const db = new MongoDbConnection().getDB();

function create(product) {
  return new Promise((resolve, reject) => {
    const productCollection = db.collection('product');

    productCollection
      .insertOne({ ...product })
      .then(msg => resolve(msg))
      .catch(err => reject(err));
  });
}

function readAll() {
  return new Promise((resolve, reject) => {
    const productCollection = db.collection('product');

    productCollection
      .find({})
      .toArray()
      .then(products => {
        resolve(products);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function readById(id) {
  return new Promise((resolve, reject) => {
    const productCollection = db.collection('product');

    productCollection
      .findOne({ _id: new ObjectId(id) })
      .then(product => {
        if (product) {
          resolve(product);
        } else {
          reject(product);
        }
      })
      .catch(err => reject(err));
  });
}

function update(id, payload) {
  return new Promise((resolve, reject) => {
    const productCollection = db.collection('product');
    productCollection
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        {
          $set: {
            ...payload,
          },
        }
      )
      .then(msg => {
        resolve(msg);
      })
      .catch(err => reject(err));
  });
}

function remove(id) {
  return new Promise((resolve, reject) => {
    const productCollection = db.collection('product');
    productCollection
      .deleteOne({ _id: new ObjectId(id) })
      .then(msg => resolve(msg))
      .catch(err => console.log(err));
  });
}

module.exports = {
  create,
  readAll,
  readById,
  update,
  remove,
};
