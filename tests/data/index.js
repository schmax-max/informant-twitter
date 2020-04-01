const fs = require('fs')

exports.params = JSON.parse(fs.readFileSync(`./tests/data/params.json`, 'UTF-8'))
