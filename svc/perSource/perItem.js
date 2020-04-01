module.exports = {perItem}

const {basicVal, fullVal, titleVal} = require('../gateway/validateTweets')


function perItem (item) {
  if (fullVal(item)) {
    // console.log('running fullCalc')
    return fullCalc(item)
  } else if (basicVal(item)) {
    // console.log('running basicCalc')
    // console.log({item})
    return basicCalc(item)
  } else {
    console.log('tweet is not validated')
    console.log({item})
    return {}
  }
}

function basicCalc ({friendCount}) {
  return {
    special: 0,
    normal: friendCount,
    total: friendCount,
  }
}

function fullCalc (item) {
  let titleArray = []
  if (titleVal(item)) {
    titleArray = convertToArray (item.story.title || item.story.titleOrDefault)
  }
  
  const tweets = item.externalStatuses
  const res = {
      special: 0,
      normal: 0,
      total: item.friendCount,
  }

  
  
  
  tweets.forEach((tweet) => {
      determineNormalOrSpecial (tweet, titleArray, res)
  })

  const doubleCounts = res.special + res.normal - res.total
  if (doubleCounts > 0) {
      // console.log({tweets, res})
      res.normal = res.total - res.special
      // console.log(`reducing normal count by ${doubleCounts}`)
  }
  return res
}


function determineNormalOrSpecial (tweet, titleArray, res) {
  const {text, externalUser} = tweet
  // console.log({text, externalUser})
  const n1 = text.includes('RT @')
  const n2 = externalUser.followerCount < 1000
  
  const tweetTextArray = convertToArray (text)
  const s1 = tweetTextArray.slice(0).reduce((bool, item, i, arr) => {
      if (titleArray.indexOf(item) === -1 && specialWords.indexOf(item) > -1) {
          bool = true
          arr.splice(1)
      }
      return bool
  }, false)
  const s2 = res.special < res.total

  if (n1 && n2) {
      res.normal += 1
  } else if (s1 && s2) {
      res.special += 1
  } else {
      res.normal += 1
  }
}


function convertToArray (text) {
  text = text.replace(/[^a-zA-Z ]/g, "");
  text = text.toLowerCase()
  return text.split(' ')
}


const specialWords = [
  "ICYMI",
  "acerbic",
  "amazing",
  "ambitious",
  "beautiful",
  "brilliant",
  "compassionate",
  "courageous",
  "depressing",
  "empathetic",
  "enamored",
  "enjoy",
  "essay",
  "essential",
  "excellent",
  "exquisite",
  "exuberant",
  "fascinating",
  "funny",
  "great",
  "harrowing",
  "haunting",
  "heart-breaking",
  "hilarious",
  "horrific",
  "impactful",
  "important",
  "incredible",
  "informative",
  "interesting",
  "love",
  "magisterial",
  "monumental",
  "moving",
  "must-read",
  "nice",
  "passionate",
  "phenomenal",
  "piece",
  "powerful",
  "priceless",
  "quality",
  "read this",
  "remarkable",
  "revealing",
  "sad",
  "story",
  "superb",
  "terrific",
  "thought-provoking",
  "unbelievable",
  "wise",
  "witty",
  "wonderful"
]


