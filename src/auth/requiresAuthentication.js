const Express = require('express')

/**
 * @type {Express.RequestHandler}
 */
module.exports = function requiresAuthentication (req, res, next) {
  const { authorization } = req.headers

  if (!authorization) {
    return res
      .status(403)
      .send({ message: 'Unauthorized' })
  }

  const [bearer, token] = authorization.split(' ')

  if (
    !bearer || bearer !== 'Bearer'|| 
    token !== process.env.ADMIN_TOKEN ||
    token !== process.env.CUSTOMER_TOKEN
  ) {
    return res
      .status(403)
      .send({ message: 'Invalid token' })
  }

  next()
}
