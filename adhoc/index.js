require('../config/connection')
const {move} = require('./move')
const {update} = require('./update')

async function main () {
  const res = await move()
  return
}

main().then(() => { return })
