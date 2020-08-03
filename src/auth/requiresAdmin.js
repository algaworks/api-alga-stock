const Express = require('express')

/**
 * @type {Express.RequestHandler}
 */
module.exports = function requiresAdminMiddleware (req, res, next) {
  if (process.env.DISABLE_SECURITY) {
    return next()
  }

  const { authorization } = req.headers

  if (!authorization) {
    return res
      .status(403)
      .send({ message: 'Unauthorized' })
  }

  const [bearer, token] = authorization.split(' ')

  if (!bearer || bearer !== 'Bearer') {
    return res
      .status(403)
      .send({ message: 'Invalid token' })
  }

  if (token !== process.env.ADMIN_TOKEN) {
    return res
      .status(401)
      .send({ message: 'You don\'t have permission to execute this action' })
  }

  next()
}