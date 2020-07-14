require('dotenv').config()

const express = require('express')
const cors = require('cors')
const { get, set } = require('./services/storage')
const auth = require('./auth')
const db = require('./services/database')

const app = express()

app.use(express.json())
app.use(cors())

app.get('/products', async (req, res) => {
  try {
    const products = await db.products.getAllData()
    res
      .send(products)
  } catch (err) {
    res
      .status(500)
      .send({ message: err.message })
  }
})

app.post('/products', auth.checker, async (req, res) => {
  try {
    const product = {
      name: String(req.body.name),
      price: parseFloat(req.body.price),
      stock: Number(req.body.stock)
    }

    db.products.insert(product)

    res
      .status(201)
      .send({
        message: 'Product sucessfully created'
      })
  } catch (err) {
    res
      .status(500)
      .send({ message: err.message })
  }
})

app.put('/products/:productId', auth.checker, async (req, res) => {
  try {
    const product = {
      ...(req.body.name && { name: String(req.body.name) }),
      ...(req.body.price && { price: parseFloat(req.body.price) }),
      ...(req.body.stock && { stock: Number(req.body.stock) })
    }

    db.products.update({ _id: req.params.productId }, {
      $set: product
    })

    res
      .status(200)
      .send({
        message: 'Product sucessfully updated'
      })
  } catch (err) {
    res
      .status(500)
      .send({ message: err.message })
  }
})

app.delete('/products/:productId', auth.checker, async (req, res) => {
  try {
    db.products.remove({ _id: req.params.productId })

    res
      .status(200)
      .send({
        message: 'Product sucessfully deleted'
      })
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
  try {
    const { productId } = req.params
    let message, status

    const product = db.products.find({ _id: productId })
    
    if (product) {
      if (product.stock > 0) {
        db.products.update({ _id: productId }, {
          $set: {
            stock: product.stock - 1
          }
        })
        status = 200
        message = 'Product successfully bought'
      } else {
        status = 401
        message = 'Product has no more stock'
      }
    } else {
      status = 404
      message = 'Product not found'
    }

    res
      .status(status)
      .send({ message })
  } catch (err) {
    res
      .status(500)
      .send({ message: err.message })
  }

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
  .listen(3024, err => {
    console.log('http://localhost:3024')
  })