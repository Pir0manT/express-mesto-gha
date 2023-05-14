const { SERVER_ERROR } = require('../utils/errors')

module.exports = (err, req, res, next) => {
  const { statusCode = SERVER_ERROR, message } = err
  res.status(statusCode).send({
    message: statusCode === SERVER_ERROR ? 'Internal Server Error' : message,
  })
  next()
}
