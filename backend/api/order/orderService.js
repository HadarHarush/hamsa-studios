const dbService = require('../../services/db.service')
const utilService = require('../../services/util.service')
const ObjectId = require('mongodb').ObjectId
const sanitize = require('mongo-sanitize')

const ORDER_KEY = 'orders'

module.exports = {
  postOrder,
}

async function postOrder(order) {
  try {
    const collection = await dbService.getCollection(ORDER_KEY)
    const res = await collection.insertOne(sanitize(order))
    return res.ops
  } catch (err) {
    console.log('couldnt post order: ', err)
    throw err
  }
}
