const mongoose = require('mongoose')
const crypto = require('crypto')

const userSchema = mongoose.Schema({
    username:{
        type:String,
        trim:true,
        unique:true,
        required:true,
        max:32,
        index:true
    },
    name:{
        type:String,
        trim:true,
        unique:true,
        required:true,
        max:32
    },
    email:{
        type:String,
        trim:true,
        unique:true,
        required:true,
        lowercase:true
    },
    profile:{
        type:String,
        required:true
    },
    hashed_password:{
        type:String,
        required:true
    },
    salt: {
        type:String
    },
    about:{
        type:String
    },
    role:{
        type:Number,
        default:0
    },
    photo:{
        type:Buffer,
        contentType:String
    },
    resetPasswordLink:{
        type:String,
        default:''
    }
},{timestamp: true})

userSchema.virtual('password')
.set(function(password){
    this._password = password

    this.salt = this.makeSalt()

    this.hashed_password = this.encryptPassword(password)
})

userSchema.methods = {
    authenticate:function(plainText){
        return this.encryptPassword(plainText) === this.hashed_password
    },
    encryptPassword: function(password){
        if(!password) return
        try{
            return crypto
            .createHmac('sha1',this.salt)
            .update(password)
            .digest('hex')
        } 
        catch(err){
            return ''
        }
    },
    makeSalt: function(){
        return Math.round(new Date().valueOf * Math.random())+''
    }
}

module.exports = mongoose.model('User', userSchema)