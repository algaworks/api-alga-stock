require('dotenv').config()

const express = require('express')
const cors = require('cors')
const { get, set } = require('./services/storage')
const auth = require('./auth')

const app = express()

app.use(express.json())
app.use(cors())

app.get('/products', (req, res) => {
  try {
    const allProducts = get('products')
    res
      .send(allProducts)
  } catch (err) {
    res
      .status(500)
      .send({ message: err.message })
  }
})

app.post('/login', (req, res) => {
  try {
    const { user, pass } = req.body
    const loggedUser = auth.login(user, pass)
    res
      .send({ ...loggedUser })
  } catch (err) {
    res
      .status(500)
      .send({ message: err.message })
  }
})

app.get('/buy/:productId', auth.checker, (req, res) => {
  const { productId } = req.params
  const products = get('products')
  let selectedProduct

  const newProducts = products.map(product => {
    if (product.id == productId) {
      selectedProduct = product
      return {
        ...product,
        stock: product.stock -1
      }
    }

    return product
  })

  set('products', newProducts)

  res.send({ message: `You bought ${selectedProduct.name}` })
})


app
  .listen(3000, err => {
    console.log('http://localhost:3000')
  })