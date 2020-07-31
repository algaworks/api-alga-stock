module.exports = function login (user, pass) {
  if (
    user === process.env.ADMIN_USER &&
    pass === process.env.ADMIN_PASS
  ) {
    return {
      id: 1,
      token: process.env.ADMIN_TOKEN,
      user: process.env.ADMIN_USER,
      email: process.env.ADMIN_EMAIL
    }
  }
  
  if (
    user === process.env.CUSTOMER_USER &&
    pass === process.env.CUSTOMER_PASS
  ) {
    return {
      id: 2,
      token: process.env.CUSTOMER_TOKEN,
      user: process.env.CUSTOMER_USER,
      email: process.env.CUSTOMER_EMAIL
    }
  }

  throw Error('We could not log you in')
}
