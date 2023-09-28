const mongoose = require('mongoose')

const userPost = mongoose.Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    caption:String,
    postImg:{
        public_id:String,
        url:String
    },
    likes:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"users"
        }
    ],
    comments:[
        {
            user:{
                type: mongoose.Schema.Types.ObjectId,
                ref:"users"
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    createdAt:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("posts",userPost)