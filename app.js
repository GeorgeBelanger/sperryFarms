const express = require('express')
const app = new express()
const fs = require('fs')

let index = fs.readFileSync(__dirname + '/index.html')

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html')
  res.send(index)
})

app.set('port', process.env.SPERRY_PORT || 3000)

app.listen(app.get('port'), function () {
  console.log('Listening on Port 3000...')
})

app.use(express.static(__dirname, +'/assets'))
