import express from 'express'
import cors from 'cors'
//import dotenv from 'dotenv'
//dotenv.config() 
import cookieParser from 'cookie-parser'
//import morgan from 'morgan'   // logger for display where open url console automatic in cmd console
import helmet from 'helmet'
import connectDB from './config/connectDb.js'
import userRouter from './route/user.route.js'
 
const app = express()
app.use(cors({
    credentials : true,
    origin : process.env.FRONTEND_URL  
}))
app.use(express.json())  //use because all request getting in json format
app.use(cookieParser())
//app.use(morgan())
app.use(helmet({
    crossOriginResourcePolicy : false  // front end and backend defrent domain hence false
}))

const PORT = 8080 || process.env.PORT

app.get("/",(request,response)=>{
    response.json({
        message: "Server is running on ", PORT
    })
})
app.use('/api/user',userRouter)

connectDB().then(()=>{  //first connec to db then connect with server
    app.listen(PORT, ()=>{
        console.log('Server is runing on port ', PORT);
    })
})

