const users = require('../model/userModel')
const userPost = require('../model/PostModel')

exports.userPost = async (req,res) => {
    try{
        const post = {
            owner:req.user._id,
            caption : req.body.caption,
            postImg : {
                public_id : 'public_id',
                url : 'img_url'
            },
        }

        const addPost = await userPost.create(post)
        const user = await users.findById(req.user._id)
        user.posts.push(addPost._id)
        await user.save()

        res.status(201).json({
            success:true,
            message:'post created!'
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message: error.message
        })
    }
    
}

exports.getUserPost = async (req,res) => {
    try{
        let posted = []
        const user = await users.findById(req.user._id)

        for(let i=0; i<user.posts.length; i++){
            const allPosts = await userPost.findById(user.posts[i])
            posted.push(allPosts)
        }
        if(posted == null){
            return res.status(400).json({
                message:'no post!'
            })
        }
        res.status(201).json({
            success:true,
            posted
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message: error.message
        })
    }
}


exports.postLike = async (req,res) => {
    try{
        const addLike = await userPost.findById(req.params._id)
        if(addLike.likes.includes(req.user._id)){
            const index =  addLike.likes.indexOf(req.user._id)
            addLike.likes.splice(index,1)
            await addLike.save()

            return res.status(200).json({
                success:true,
                message:'post Unlike!'
            })
        }else{
            addLike.likes.push(req.user._id)
            await addLike.save()
            res.status(201).json({
                success:true,
                message:'post like!'
            })
        }
    }catch(error){
        res.status(500).json({
            success:false,
            message: error.message
        })
    }
}


exports.postComment = async (req,res) => {
    try{
        const post = await userPost.findById(req.params._id)
        post.comments.push({
            user:req.user._id,
            comment:req.body.comment
        })
        await post.save()
        res.status(201).json({
            success:true,
            message:"comment added!"
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message: error.message
        })
    }
}

exports.postBookMark = async (req,res) => {
    try{
        const post = await userPost.findById(req.params._id)
        const loginUser = await users.findById(req.user._id)
    
        if(loginUser.bookmark.includes(post._id)){
            const index = loginUser.bookmark.indexOf(post._id)
            loginUser.bookmark.splice(index,1)
            await loginUser.save()
            
            return res.status(200).json({
                success:true,
                message:"post is UnBookmark"
            })
        }else{
            loginUser.bookmark.push(post._id)
            await loginUser.save()

            res.status(201).json({
                success:true,
                message:"Post Bookmark!"
            })
        }
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


exports.getBookMark = async (req,res) => {
    try{
        let bookmarkPosted = []
        const user = await users.findById(req.user._id)

        for(let i=0; i<user.bookmark.length; i++){
            const bookmarkPost = await userPost.findById(user.bookmark[i])
            bookmarkPosted.push(bookmarkPost)
        }

        if(bookmarkPosted == null){
            return res.status(400).json({
                message:"no bookmark!"
            })
        }

        res.status(201).json({
            success:true,
            bookmarkPosted
        })

    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.followPost = async (req,res) => {
    try{
        const loginUser = await users.findById(req.user._id)
        let latestPost = []
        for(let i=0; i<loginUser.following.length; i++){
            let getFollowingUser = await loginUser.following[i]
            let followingUser = await users.findById(getFollowingUser)
            let getLatestPostId = await followingUser.posts[followingUser.posts.length - 1]
            let getLatestPost = await userPost.findById(getLatestPostId)
            latestPost.push(getLatestPost)
        }   
        res.status(200).json({
            success:true,
            latestPost
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.deletePost = async (req,res) => {
    try{
        const user = await users.findById(req.user._id)
        const post = await userPost.findById(req.params._id)
        if(!post){
            return res.status(404).json({
                success:false,
                message:'Post not found!'
            })
        }
        await post.deleteOne({_id:req.params._id})
        const index = await user.posts.indexOf(req.params._id)
        user.posts.splice(index,1)
        await user.save()

        res.status(200).json({
            success:true,
            message:"post deleted!"
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

