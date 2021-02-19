const User = require('../models/user')
const shortId = require('shortid')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')



exports.signup = (req, res) => {
    User.findOne({ email: req.body.email })
        .exec((err, user) => {
            if (user) return (res.status(400).json({ error: 'Email Already Taken' }))

            const { name, email, password } = req.body
            let username = shortId.generate()
            let profile = `${process.env.CLIENT_URL}/profile/${username}`
            let newUser = new User({ name, email, password, profile, username })
            newUser.save((err, success) => {
                if (err) return res.status(400).json({ error: err })
                res.json({
                    message: 'Account Created! Proceed to login',
                    user: success
                })
            })
        })
}


exports.signin = (req, res) => {
    const { email, password } = req.body
    //Check user exists
    User.findOne({ email }).exec((err, user) => {
        if (err || !user) return res.status(400).json({ error: 'Please signup for new account' })


        //autenticate
        if (!user.authenticate(password)) {
            return res.status(400).json({
                error: 'Please check signin details '
            })
        }
        //generate a token and send to user
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
        res.cookie('token', token, { expireIn: '1d' })

        const { _id, username, name, email, role } = user

        return res.json({
            token,
            user: { _id, username, name, email, role }
        })
    })
}


exports.signout = (req, res) => {
    res.clearCookie('token');
    res.json({
        message: 'Signout Success'
    })
}

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET, algorithms: ['sha1', 'RS256', 'HS256']
})

exports.authMiddleware = (req, res, next)=>{
    const authUserId = req.user._id
    User.findById({_id:authUserId})
    .exec((err,user)=>{
        if(err || !user){
           return res.status(400).json({
                error:'User not found'
            })
        }
        req.profile = user
        next()
    })
}

exports.adminMiddleware = (req, res, next)=>{
    const adminUserId = req.user._id
    User.findById({_id:adminUserId})
    .exec((err,user)=>{
        if(err || !user){
           return res.status(400).json({
                error:'User not found'
            })
        }

        if(user.role !== 1){
            return res.status(400).json({
                error:'Admin Resource Access Denied'
            })
        }
        req.profile = user
        next()
    })
}