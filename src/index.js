require('dotenv').config()

const express = require('express')
const cors = require('cors')
const auth = require('./auth')
const db = require('./services/database')
const productsRoutes = require('./routes/products')
const authenticationRoutes = require('./routes/authentication')

const app = express()

app.use(express.json())
app.use(cors())

app.use('/products', productsRoutes)
app.use('/authentication', authenticationRoutes)

app
  .listen(3024, err => {
    console.log('http://localhost:3024')
  })