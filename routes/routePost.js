const express = require('express')
const {userPost,postBookMark,getUserPost,postLike,postComment,getBookMark,followPost} = require('../Controllers/post')
const {followers,following} = require('../Controllers/User')
const {auth} = require('../middleware/auth')
const postRoute = express.Router()

postRoute.route('/post').post(auth,userPost)
postRoute.route('/getPosts').get(auth,getUserPost)
postRoute.route('/postLike/:_id').get(auth,postLike)
postRoute.route('/comment/:_id').post(auth,postComment)
postRoute.route('/postBookmark/:_id').get(auth,postBookMark)
postRoute.route('/getBookmark').get(auth,getBookMark)
postRoute.route('/follower/:_id').get(auth,followers)
postRoute.route('/following/:_id').get(auth,following)
postRoute.route('/latestPost').get(auth,followPost)
module.exports = postRoute


