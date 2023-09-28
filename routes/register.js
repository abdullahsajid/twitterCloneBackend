const express = require('express')
const {createUser} = require('../Controllers/register')
const router = express.Router()

router.route('/register').post(createUser)
module.exports = router