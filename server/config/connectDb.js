import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

if(!process.env.MONGODB_URL){
    console.log("Please provide MONGODB_URL");
}

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('MongoDB Connect')
    } catch (error) {
        console.log("MongoDb Connect Error", error)
        process.exit(1)
    }
}

export default connectDB;