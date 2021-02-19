const mongoose = require('mongoose')

const tagSchema = mongoose.Schema({
    name:{
        type:String,
        trim:true,
        unique:true,
        required:true,
        max:32
    },
    slug:{
        type:String,
        unique:true,
        index:true
    }
}, {timestamp:true})

module.exports = mongoose.model('Tag', tagSchema)