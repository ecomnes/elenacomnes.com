var bel = require('bel')
var hyperstream = require('hyperstream')
var fs = require('fs')
var pump = require('pump')

var images = bel`
  <img src="foo">
`.toString()

var hs = hyperstream({
  '.markdown-body': images
})

var layout = fs.createReadStream('./layout.html')

pump(layout, hs, process.stdout, done)

function done (err) {
  if (err) throw err
}
