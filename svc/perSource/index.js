'use strict'
const axios = require('axios')
const {postData} = require('../../config')
const {perItem} = require('./perItem')

module.exports = {
    perSource
}

async function perSource (trigger, {source_url, nuzzel}) {
    // console.log({nuzzel})
    
    const items = await getTwitterData(nuzzel)
    let iterations = items.length
    // iterations = 1

    let links = []
    let extras = []
    for (let i=0; i<iterations; i++) {
        links.push(items[i].url)
        const extra = perItem(items[i])
        extras.push(extra)
    }

    const scannerConfig = {
        target: `scanner`, 
        data: {source_url, source_type: `twitter_${trigger}`, links, extras},
    }

    postData(scannerConfig)

    return {links, extras}
}

async function getTwitterData ({nuzzel_user_id}) {
    const url = `https://api.nuzzel.com/v1.0/users/${nuzzel_user_id}/sharedlinks?sort=friends&count=20&filter=1&offset=0&when=week`

    const headers = {
        'X-NuzzelApiKey': "rE8I7GrI49b959ujJIcW1z8pdBc1P9Yw",
        'X-NuzzelUserToken': getNuzzelToken (),
        'User-Agent': 'Nuzzel/1260 (iPhone; iOS 10.2; Scale/2.00)',
        'Accept': 'application/json',
        'Accept-Language': 'en-US;q=1, es-US;q=0.9, de-DE;q=0.8'
    }

    const {data} = await axios({
        method: 'get',
        url,
        headers,
    })
    if (data && data.results && data.results.sharedlinks) {
        return data.results.sharedlinks
    } else {
        console.log('no twitter data')
        return []
    }
    
}

function getNuzzelToken () {
    const nuzzel_tokens = [
        "e09634d264292347da4c7240791fd5a0",
        "a72a77b7c9d5249f9f1d87279c37e861",
        "fd2aa6e5b37f16fcb0a8602dbd9192dd",
        "6eda7321f9ce2866f5d065ad08074547",
        "47b71f17c2df0f128746389479d0228f",
        "5e19ec45c9bbb1c979676026319e212b",
        "e82962b4385663c44102143a687a4fcf",
        "1359c2fe390056f9957e087bf11327d7",
        "197c3270b76227ec642e013841987db3",
        "9b59dab126cae5293cf51f0c720890ec",
        "5b5f19a56c15f6352773392fbea06d06"
    ]
    return nuzzel_tokens[Math.floor(Math.random() * nuzzel_tokens.length)]
    
}

