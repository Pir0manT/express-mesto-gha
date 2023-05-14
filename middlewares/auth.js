const jwt = require('jsonwebtoken')
const { UNAUTHORIZED, StatusCodeError } = require('../utils/errors')

module.exports = (req, res, next) => {
  let token = ''
  if (req.cookies.jwt !== undefined) {
    token = req.cookies.jwt
  } else {
    const { authorization } = req.headers
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new StatusCodeError(UNAUTHORIZED)
    }
    token = authorization.replace('Bearer ', '')
  }
  const { NODE_ENV, JWT_SECRET } = process.env
  let payload
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production'
        ? JWT_SECRET
        : '85353ab2edfacd45adcb8a9b27c3187df2663355dba48fdb23d0c2184246881a'
    )
  } catch (err) {
    throw new StatusCodeError(UNAUTHORIZED)
  }
  req.user = payload
  next()
}
