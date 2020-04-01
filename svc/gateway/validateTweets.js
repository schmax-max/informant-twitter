const Joi = require('@hapi/joi');
module.exports = {basicVal, fullVal, titleVal}
const {validate} = require('./validate')

function basicVal ({friendCount}) {
  return validate (
    {friendCount}, 
    basicSchema,
    isTweet = true
  )
}

function fullVal ({friendCount, externalStatuses}) {
  return validate (
    {friendCount, externalStatuses}, 
    fullSchema,
    isTweet = true
  )
}

function titleVal ({story}) {
  return validate (
    {story}, 
    fullSchema,
    isTweet = true
  )
}


const basicSchema = Joi.object({
  friendCount: Joi.number().required(), 
})


const fullSchema = Joi.object({
  friendCount: Joi.number().required(),
  externalStatuses: Joi.array().items(Joi.object()).required(), 
})

const titleSchema = Joi.object({
  story: Joi.object().required(),
})



// {
//   text: Joi.string().required(),
//   externalUser: Joi.object().required(), 
// }

// {
//   title: Joi.string().required()
// }