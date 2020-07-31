const Express = require('express')
const Database = require('../../services/database')
const productsRoutes = require('../../routes/products')
const products = require('.')

/**
 * Get a single product
 * @type {Express.RequestHandler} 
 */
module.exports = function getSingleProduct (req, res) {
  try {
    Database.products.findOne({ _id: req.params.productId }, (err, product) => {
      if (err) throw err

      if (!product) {
        return res
          .status(404)
          .send()
      }

      res
        .status(200)
        .send({ ...product })
    })    
  } catch (err) {
    res
      .status(500)
      .send({ message: err.message })
  }
}
