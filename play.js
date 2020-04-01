require('./config/connection')
const {params} = require('./tests/data')


const {commander} = require('./svc')
commander(params)



const {move} = require('./adhoc/move')
// move()

