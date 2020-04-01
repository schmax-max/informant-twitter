'use strict'
const {updateSource} = require('./updateSource')
const {gateway} = require('./gateway')
const {Twitter} = require('../model')

module.exports = {master, commander}


async function master (req = {}) {
  console.log('starting master')
  if (gateway (req)) {
    return await commander(req.params)
  } else {
    return
  } 
}


async function commander ({trigger}) {
  try {
    const find = {'boolean.is_ineffective': false}
    const sources = await Twitter[trigger].find()
    let iterations = sources.length
    // iterations = 1
    for (let i=0; i<iterations; i++) {
      const source = sources[i]
      const {perSource} = require('./perSource')
      const response = await perSource(trigger, source)
      updateSource(source, response)
    }
  } catch(e) {
    console.log({e})
  }
  return
}
