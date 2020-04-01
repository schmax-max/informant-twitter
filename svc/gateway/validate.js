module.exports = {validate}

function validate (input, schema, isTweet) {
  const {error} = schema.validate(input);
  if (error) {
    if (isTweet) {
      console.log({input})
    } else {
      console.log({error})
    }
    return false
  } else {
    return true
  }
}
