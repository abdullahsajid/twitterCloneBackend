const express = require('express')
const {recommendUser} = require('../Controllers/recommendUser')
const {viewProfile} = require('../Controllers/User')
const {auth} = require('../middleware/auth')
const userRoute = express.Router()

userRoute.route('/recommendedUser').get(auth,recommendUser)
userRoute.route('/viewProfile/:_id').get(auth,viewProfile)
module.exports = userRoute
