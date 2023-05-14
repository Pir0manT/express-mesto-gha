const BAD_REQUEST = 400
const UNAUTHORIZED = 401
const FORBIDDEN = 403
const NOT_FOUND = 404
const CONFLICT = 409
const SERVER_ERROR = 500

class StatusCodeError extends Error {
  constructor(statusCode, message = '') {
    if (message.length === 0)
      switch (statusCode) {
        case BAD_REQUEST:
          message = 'Invalid data sent'
          break
        case UNAUTHORIZED:
          message = 'Authorization required'
          break
        case FORBIDDEN:
          message = 'Access denied'
          break
        case NOT_FOUND:
          message = 'Service not found'
          break
        case CONFLICT:
          message = 'User with this email is already registered'
          break
        case SERVER_ERROR:
          message = 'Internal Server Error'
      }
    super(message)
    this.statusCode = statusCode
  }
}

const handleError = (err, next) => {
  console.log(err)
  switch (err.name) {
    case 'CastError':
    case 'ValidationError':
      next(new StatusCodeError(BAD_REQUEST))
      return
    case 'DocumentNotFoundError':
      next(new StatusCodeError(NOT_FOUND, 'Item with specified id not found'))
      return
    case 'MongoServerError':
      if (err.code === 11000)
        next(
          new StatusCodeError(
            CONFLICT,
            'User with this email is already registered'
          )
        )
      else next(SERVER_ERROR, 'Mongo Server Error')
      return
  }
  next(err)
}

module.exports = {
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  CONFLICT,
  NOT_FOUND,
  SERVER_ERROR,
  handleError,
  StatusCodeError,
}
