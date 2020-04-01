const {Twitter} = require('../model')
module.exports = {move}


async function move () {
  try {
    const find = {
      'interest_info.interest_category_name': 'Sports'
    }
  
  
    
    const backups = await Twitter.others.deleteMany(find)
    // console.log({backups})
    // let iterations = backups.length
    // console.log({iterations})
    // // iterations = 1
    // for (let i=0; i<iterations; i++) {
    //   const item = backups[i]
    //   try {
    //     const {source_url} = item
    //     const options = {upsert: true, new: true}
    //     const source = await Twitter.sports.findOneAndUpdate({source_url}, item, options)
    //   } catch(e) {
    //     console.log({e})
    //   }
    // }
    
    // console.log(backups.length)
    return 'home'
  } catch(e) {
    console.log({e})
  }
}