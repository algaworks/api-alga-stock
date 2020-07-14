const Datastore = require('nedb')

const products = new Datastore({
  filename: 'products',
  autoload: true
})

const users = new Datastore({
  filename: 'users',
  autoload: true
})

module.exports = {
  products,
  users
}
