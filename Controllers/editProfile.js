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


exports.updateProfile = async (req,res) => {
    try{
        const user = await users.findById(req.user._id)
        const profile = await userProfile.findById(user.profileDetails)
        const {name,bio,bannerImg,Avatar} = req.body

        if(name !== profile.userName){
            profile.userName = req.body.name
        }
        if(bio !== profile.bio){
            profile.bio = req.body.bio
        }
        if(bannerImg !== profile.bannerImg.url){
            await cloudinary.v2.uploader.destroy(profile.bannerImg.public_id)
            const UpdateBannerImg = await cloudinary.v2.uploader.upload(bannerImg,{
                folder:'Banner'
            })
            profile.bannerImg.public_id = UpdateBannerImg.public_id
            profile.bannerImg.url = UpdateBannerImg.secure_url
        }
        if(Avatar !== profile.Avatar.url){
            await cloudinary.v2.uploader.destroy(profile.Avatar.public_id)
            const UpdateAvatarImg = await cloudinary.v2.uploader.upload(Avatar,{
                folder:'Avatar'  
            })
            profile.Avatar.public_id = UpdateAvatarImg.public_id
            profile.Avatar.url = UpdateAvatarImg.secure_url
        }

        await profile.save()

        res.status(200).json({
            success:true,
            profile
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

