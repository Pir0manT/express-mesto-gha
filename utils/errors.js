const BAD_REQUEST = 400
const NOT_FOUND = 404
const SERVER_ERROR = 500

const handleError = (err, res) => {
  switch (err.name) {
    case 'CastError':
    case 'ValidationError':
      res.status(BAD_REQUEST).send({ message: 'Invalid data sent' })
      break
    case 'DocumentNotFoundError':
      res
        .status(NOT_FOUND)
        .send({ message: 'Item with specified id not found' })
      break
    default:
      res.status(SERVER_ERROR).send({ message: 'Internal Server Error' })
      break
  }
}

module.exports = { BAD_REQUEST, NOT_FOUND, SERVER_ERROR, handleError }
