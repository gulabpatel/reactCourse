const connectToMongo = require('./db')
const express = require('express')
connectToMongo();

const app = express()
const port = 3000

app.get('/hit', (req, res) => {
  res.send('Hello Gulab Ji!')
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
