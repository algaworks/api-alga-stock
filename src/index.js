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

app.get('/products/:productId', (req, res) => {
  try {
    db.products.findOne({ _id: req.params.productId }, (err, product) => {
      if (err) throw err

      if (product) return res.send(product)
      return res.status(404).send({ message: 'Product not found' })
    })
    
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

app.get('/buy/:productId', auth.checker, async (req, res) => {
  try {
    const { productId } = req.params
    let message, status = 200

    db.products.findOne({ _id: productId }, async (err, product) => {
      console.log(product)
      if (product) {
        if (product.stock > 0) {
          await db.products.update(
            { _id: productId },
            { $set: { stock: product.stock - 1 } },
            (err) => {
              if (err) {
                throw err
              }
              res
                .status(200)
                .send({ message: 'Product successfully bought' })
            }
          )
        } else {
          res
            .status(401)
            .send({ message: 'Product has no more stock' })
        }
      } else {
        res
          .status(404)
          .send({ message: 'Product not found' })
      }
    })   
  } catch (err) {
    res
      .status(500)
      .send({ message: err.message })
  }
})


app
  .listen(3024, err => {
    console.log('http://localhost:3024')
  })