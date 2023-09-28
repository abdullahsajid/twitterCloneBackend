const userProfile = require('../model/userProfile')
const users = require('../model/userModel')
const cloudinary = require('cloudinary')

exports.editProfile = async (req,res) => {
    try{

        const bannerImg = await cloudinary.v2.uploader.upload(req.body.bannerImg,{
            folder:'Banner'
        })

        const avatarImg = await cloudinary.v2.uploader.upload(req.body.Avatar,{
          folder:'Avatar'  
        })

        const editUser = {
            bannerImg:{
                public_id: bannerImg.public_id,
                url: bannerImg.secure_url
            },
            Avatar:{
                public_id: avatarImg.public_id,
                url: avatarImg.secure_url
            },
            userName: req.body.name,
            bio: req.body.bio,
            Owner: req.user._id,
        }
        
        const profile = await userProfile.create(editUser)
        const user = await users.findById(req.user._id)
        user.profileDetails = profile._id
        await user.save()

        res.status(201).json({
            success:true,
            editUser
        })

    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}


exports.getProfile = async (req,res) => {
    try{
        const user = await users.findById(req.params._id)

        const details = await userProfile.findById(user.profileDetails)

        res.status(200).json({
            success:true,
            details
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

