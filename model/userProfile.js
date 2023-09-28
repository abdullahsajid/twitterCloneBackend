const mongoose = require('mongoose')

const ProfileSchema = mongoose.Schema({
    Owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    bannerImg:{
        public_id:String,
        url:String
    },
    Avatar:{
        public_id:String,
        url:String
    },
    userName:{
        type:String,
        required:[true,'please enter a name']
    },
    bio:{
      type:String,  
    }
})

module.exports = mongoose.model('userProfile',ProfileSchema)
