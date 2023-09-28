const usermodel = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.userLogin = (req,res) => {
    usermodel.findOne({email:req.body.email})
    .then((user) => {
        bcrypt.compare(req.body.password,user.password)
        .then((passcheck) => {
            
            if(!passcheck){
                return res.status(400).send({
                    message:"password not match",
                    error
                })
            }

            const token = jwt.sign({
                _id: user._id,
                userEmail: user.email
            },
            process.env.JWT_TOKEN,
            {expiresIn:'24h'}
            )
            res.status(200).cookie('token',token,{httpOnly: true})
            .json({
                message:"login successfully",
                token,
                user  
            })
        })
        .catch((err) => {
            
            res.status(400).send({
                message:"password not match!",
                err
            })
        })
    })
    .catch((err) => {
       
        res.status(404).send({
            message:"email not found",
            err
        })
    })
}


