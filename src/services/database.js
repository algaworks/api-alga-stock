const Datastore = require('nedb')

const products = new Datastore({
  filename: 'products.db',
  autoload: true,
  timestampData: true
})

const users = new Datastore({
  filename: 'users.db',
  autoload: true,
  timestampData: true
})

module.exports = {
  products,
  users
}
