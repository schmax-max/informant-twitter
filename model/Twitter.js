'use strict'
const mongoose = require('mongoose');

const schema = new mongoose.Schema( {
    _type: {
        type: "string"
    },
    _id: {
        type: "ObjectId"
    },
    name: {
        type: "string"
    },
    channel_url: {
        type: "string"
    },
    source_url: {
        type: "string"
    },
    source_domain: {
        type: "string"
    },
    created_at: {
        type: "date",
        format: "date-time"
    },
    boolean: {
        type: "object"
    },
    boolean: {
        type: "object"
    },
    process_flags: {
        type: "object"
    },
    nuzzel: {
        type: "object"
    }
})

schema.set('toJSON', { virtuals: true });


function createModels () {
    const collections = [
        'sports',
        'others',
    ]
    const models = {}
    collections.forEach((collection) => {
        models[collection] = mongoose.model(`twitter_${collection}`, schema, `twitter_${collection}`)
    })
    return models
}

module.exports = createModels ()
