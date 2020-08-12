const Express = require('express')
const auth = require('../../auth/index')

/** @type {Express.RequestHandler} */
module.exports = async function login (req, res) {
  try {
    const { user, pass } = req.body
    const loggedUser = await auth.login(user, pass)
    
    delete loggedUser.pass

    res
      .send({ ...loggedUser })
  } catch (err) {
    res
      .status(500)
      .send({ message: err.message })
  }
}