const usermodel = require('../model/userModel')
const bcrypt = require('bcrypt')

exports.createUser = (req,res) => {
    bcrypt.hash(req.body.password,10)
    .then((hashedPassword) => {
        const users = new usermodel({
            email:req.body.email,
            password:hashedPassword
        })
        users.save()
        .then((users) => {
            res.status(201).send({
                message:'user created successfully!',
                users
            })
        }).catch((err) => {
            res.status(500).send({
                message:'something went wrong!',
                err
            })
        })
    })
    .catch((err)=>{
        res.status(500).send({
            message:"password wasn't hash",
            err
        })
    })
}
