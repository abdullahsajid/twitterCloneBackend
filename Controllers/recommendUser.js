const users = require('../model/userModel')

exports.recommendUser = async (req,res) => {
    try{
        const loginUser = await users.findById(req.user._id)
        const allUser = await users.find({})
        const recommendedUser = []
        const uniqueIndex = new Set()
        for(let i=0; i<3; i++){
            let userIndex =  Math.floor(Math.random() * allUser.length)
        
            while(uniqueIndex.has(userIndex)){
                userIndex =  Math.floor(Math.random() * allUser.length)
            }
            uniqueIndex.add(userIndex)
            
            let recommend = allUser[userIndex]
            if(recommend?._id.toString() !== loginUser?._id.toString()){
                recommendedUser.push(recommend)
            }
        }
        res.status(200).json({
            success:true,
            recommendedUser
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
