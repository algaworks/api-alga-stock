const fs = require('fs')
const { resolve } = require('path')

fs.unlinkSync(resolve(__dirname, '../../products.db'))
fs.unlinkSync(resolve(__dirname, '../../users.db'))

console.log('done =)')