const express = require('express')
const app = new express()
const fs = require('fs')

let index = fs.readFileSync(__dirname + '/home-page.html')

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html')
  res.send(index)
})

app.set('port', process.env.PORT || 3001)

app.listen(app.get('port'), function () {
  console.log('Listening on Port 3001...')
})

app.use(express.static(__dirname, +'/assets'))
