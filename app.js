const express = require('express')
const app = express()

const cookieParser = require('cookie-parser')
const {auth} = require('./middleware/auth')
const cors = require('cors')
const dbConnect = require('./db/dbConnect')
const cloudinary = require('cloudinary')

const corsOptions = {
    origin:['http://localhost:3000','https://twitterclonefrontend.onrender.com'], 
    credentials:true,        
    optionSuccessStatus:200,
    methods:["GET","POST"]
}
const registerRoute = require('./routes/register')
const loginRouter = require('./routes/login')
const editUserRoute = require('./routes/editUser')
const postRoute = require('./routes/routePost')

app.use(cookieParser())
app.use(cors(corsOptions))
app.use(express.json({limit:'50mb'}))
app.use(express.urlencoded({limit:'50mb', extended:true }))
dbConnect()


app.get("/auth",auth,(request, response) => {
    response.json({ message: "You are authorized to access me" });
});

//routes
app.use('/api',registerRoute)

app.use('/api',loginRouter)

app.use('/api',editUserRoute)

app.use('/api',postRoute)

app.use('/test',(req,res)=>{
    res.json({message:"Test!"})    
})

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

app.listen(process.env.PORT,() => {
    console.log("server is running on",process.env.PORT)
})


