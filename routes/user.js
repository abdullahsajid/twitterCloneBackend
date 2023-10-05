const express = require('express')
const {recommendUser} = require('../Controllers/recommendUser')
const {auth} = require('../middleware/auth')
const userRoute = express.Router()

userRoute.route('/recommendedUser').get(auth,recommendUser)
module.exports = userRoute
