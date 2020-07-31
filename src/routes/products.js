const { Router } = require('express')

const auth = require('../auth')
const products = require('../features/products')

const productsRoutes = Router()

productsRoutes
  .get('/',   products.getAll)
  .post('/',  auth.requiresAdmin, products.createSingle)

productsRoutes
  .get('/:productId',    products.getSingle)
  .patch('/:productId',  auth.requiresAdmin, products.updateSingle)
  .delete('/:productId', auth.requiresAdmin, products.deleteSingle)

module.exports = productsRoutes