const Express = require('express')
const Database = require('../../services/database')

/**
 * Get a single product
 * @type {Express.RequestHandler} 
 */
module.exports = function deleteSingleProduct (req, res) {
  try {
    const { productId } = req.params

    Database.products.remove({ _id: productId }, (err) => {
      if (err) throw err

      res
        .status(200)
        .send()
    })    
  } catch (err) {
    res
      .status(500)
      .send({ message: err.message })
  }
}
