'use strict'
const {Source} = require('../model')
module.exports = update


async function update () {
  console.log('in update')
  console.log({Source})
  for (const type in Source) {
    
    const options = {upsert: true, new: true}
    const updates = await Source[type].updateMany({}, { $rename: { 'nuzzel_input': 'nuzzel', 'channel_url': 'source_url', 'boolean': 'boolean' }}, options)
  }
}