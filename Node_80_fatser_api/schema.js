import mongoose from "mongoose";
export const Product = mongoose.model(
    "Product",
    mongoose.Schema({
        name:{
            type: String,
            required:[true, "Please enter Name"]
        },
        photo:{
            type:String,
            required:[true,"Please enter Photo"]
        },
        price:{
            type:Number,
            required:[true,"Please enter Price"]
        },
        stock:{
            type:Number,
            required:[true,"Please enter Stock"]
        },
        category:{
            type:String,
            required:[true,"Please enter Category"],
            trim:true
        }
    },
    {
        timestamps:true
    })  
)