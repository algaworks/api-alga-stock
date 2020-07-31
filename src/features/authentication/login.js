const Express = require('express')
const auth = require('../../auth/index')

/** @type {Express.RequestHandler} */
module.exports = function login (req, res) {
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
}