module.exports = function checker (req, res, next) {
  const token = req.headers.authorization

  if (!token) {
    res
      .status(403)
      .send({ message: 'Unauthorized' })
  }

  if (token !== process.env.TOKEN) {
    res
      .status(403)
      .send({ message: 'Invalid token' })
  }

  next()
}
