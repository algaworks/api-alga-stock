const Express = require('express')
const Database = require('../../services/database')

/** @type {Express.RequestHandler} */
module.exports = function updateSingleProduct (req, res) {
  try {
    const { productId } = req.params
    
    const product = {
      ...(req.body.name && { name: String(req.body.name) }),
      ...(req.body.price && { price: parseFloat(req.body.price) }),
      ...(req.body.stock && { stock: Number(req.body.stock) })
    }

    Database.products.update(
      { _id: productId },
      { $set: product }, null,
      (err) => {
        if (err) throw err

        res
          .status(200)
          .send()
      }
    )    
  } catch (err) {
    res
      .status(500)
      .send({ message: err.message })
  }
}