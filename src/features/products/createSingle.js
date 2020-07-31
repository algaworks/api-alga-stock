const Express = require('express')
const Database = require('../../services/database')

/** @type {Express.RequestHandler} */
module.exports = function createSingleProduct (req, res) {
  try {
    const product = {
      name: String(req.body.name),
      price: parseFloat(req.body.price),
      stock: Number(req.body.stock)
    }

    Database.products.insert(product, (err) => {
      if (err) throw err

      res
        .status(201)
        .send()
    })    
  } catch (err) {
    res
      .status(500)
      .send({ message: err.message })
  }
}
