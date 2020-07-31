const Express = require('express')
const Database = require('../../services/database')

/**
 * Get all products from DB (without pagination)
 * @type {Express.RequestHandler} 
 */
module.exports = function getAllProducts (req, res) {
  try {
    const products = Database.products.getAllData()
    res
      .status(200)
      .send(products)
  } catch (err) {
    res
      .status(500)
      .send({ message: err.message })
  }
}
