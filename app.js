const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const { PORT = 3000, DB_PATH = 'mongodb://127.0.0.1:27017/mestodb' } =
  process.env
const app = express()

app.use(bodyParser.json())
app.use((req, res, next) => {
  req.user = {
    _id: '5d8b8592978f8bd833ca8133',
  }
  next()
})

mongoose.connect(DB_PATH)
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})
