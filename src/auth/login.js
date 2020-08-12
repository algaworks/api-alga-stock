const Database = require('../services/database')

module.exports = function login (user, pass) {
  return new Promise((resolve, reject) => {
    Database.users.findOne({ user, pass }, (err, user) => {
      if (err)
        reject({
          message: 'We could not log you in. Reason: ' + err.message
        })
      
      if (!user)
        reject({
          message: 'User does not exists'
        })
      
      resolve(user)
    })
  })
}
