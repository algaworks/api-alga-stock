module.exports = function login (user, pass) {
  if (user === process.env.USER && pass === process.env.PASS) {
    return {
      id: 1,
      token: process.env.TOKEN,
      user: process.env.USER,
      email: process.env.EMAIL
    }
  }

  throw Error('We could not log you in')
}
