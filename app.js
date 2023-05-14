const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const { errors } = require('celebrate')
const rateLimit = require('express-rate-limit')
const routes = require('./routes')
const auth = require('./middlewares/auth')
const errorsHandler = require('./middlewares/handelError')
const { createUser, login } = require('./controllers/users')
const {
  validationCreateUser,
  validationLogin,
} = require('./middlewares/validations')

require('dotenv').config()

const {
  PORT = 3000,
  DB_PATH = 'mongodb://127.0.0.1:27017/mestodb',
  NODE_ENV,
  MAX_AUTH_ATTEMPTS,
} = process.env

const authLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: NODE_ENV === 'production' ? MAX_AUTH_ATTEMPTS : 100,
  message:
    'Too many register or login attempts from this IP, please try again after an hour',
  standardHeaders: true,
  legacyHeaders: false,
})

const app = express()

app.use(helmet())
app.use(bodyParser.json())
app.use(cookieParser())

app.post('/signin', [validationLogin, authLimiter], login)
app.post('/signup', [validationCreateUser, authLimiter], createUser)

app.use(auth)
app.use(routes)
app.use(errors())
app.use(errorsHandler)

mongoose.connect(DB_PATH)
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})
