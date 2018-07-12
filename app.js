const express = require('express')
const app = new express()
const fs = require('fs')

let cache = fs.readFileSync(__dirname + '/index.html')

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html')
  res.send(cache)
})

app.set('port', process.env.PORT || 3000)

app.listen(app.get('port'), function () {
  console.log('Listening on Port 3000...')
})

app.use(express.static(__dirname, +'/assets'))
