const express = require('express')
const {userLogin} = require('../Controllers/login')
const{logout} = require('../Controllers/logout')
const loginRouter = express.Router()


loginRouter.route('/login').post(userLogin)
loginRouter.route('/logout').get(logout)
module.exports = loginRouter