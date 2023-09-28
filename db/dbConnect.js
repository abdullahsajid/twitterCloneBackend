const mongoose = require('mongoose')
require('dotenv').config()

async function dbConnect(){
    mongoose.connect(process.env.db_url)
    .then(() =>{
        console.log('successfully connected')
    })
    .catch((err) => {
        console.log('unable to connect')
        console.log(err)
    })
}
module.exports = dbConnect
