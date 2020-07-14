require('dotenv').config()
const { existsSync } = require('fs')
const { resolve } = require('path')

const productsDbExists = existsSync(resolve(__dirname, '../../products.db'))
const usersDbExists = existsSync(resolve(__dirname, '../../users.db'))

if (productsDbExists || usersDbExists) {
  console.log(`
Error: Database files already exists.
If you want to run setup again, please delete users.db and products.db files`)
  return
}

const db = require('./database')

const {
  ADMIN_USER,
  ADMIN_PASS,
  ADMIN_EMAIL,
  ADMIN_TOKEN
} = process.env

const {
  CUSTOMER_USER,
  CUSTOMER_PASS,
  CUSTOMER_EMAIL,
  CUSTOMER_TOKEN
} = process.env

db.products.insert([
  {
    name: 'Cookie',
    price: 1.5,
    stock: 20
  },
  {
    name: 'Detergent',
    price: 1.75,
    stock: 50
  },
  {
    name: 'Shrimp pack',
    price: 22.5,
    stock: 3
  }
])

db.users.insert([
  {
    user: CUSTOMER_USER,
    pass: CUSTOMER_PASS,
    email: CUSTOMER_EMAIL,
    token: CUSTOMER_TOKEN,
    role: 'customer'
  },
  {
    user: ADMIN_USER,
    pass: ADMIN_PASS,
    email: ADMIN_EMAIL,
    token: ADMIN_TOKEN,
    role: 'admin'
  }
])
