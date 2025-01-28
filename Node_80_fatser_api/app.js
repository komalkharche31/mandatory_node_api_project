import express from "express"
import morgan from "morgan"
import mongoose, { Mongoose } from "mongoose"
import dotenv from "dotenv"
import { faker } from '@faker-js/faker';
import { Schema } from "mongoose"
import { Product } from "./schema.js";
import NodeCache from "node-cache";
dotenv.config({
    path:".env",
})

mongoose
    .connect(process.env.MONGO_URL,{ dbName:"TEMPO"})
    .then((c)=> console.log("Database Connected"))
    .catch((err) => console.log(err))

const app = express();
const nodeCache = new NodeCache({
     stdTTL:60
})

app.use(morgan("dev")); //this is middle to know whos is request currently
app.use(express.json())

app.get('/',(req, res)=>{
    res.send("API is Working")
})

app.get("/products",async(req,res)=>{
    let products;
    if (nodeCache.has("products")) {
        products = JSON.parse(nodeCache.get("products")) 
    }else{
        products = await Product.find();
        nodeCache.set("products",JSON.stringify(products))
    }
    return res.json({
        success:true,
        products
    })
})

app.put('/update',async(req,res)=>{
    const name = req.body.name
    const product = await Product.findById(req.query.id);
    product.name = name;
    await product.save();
    nodeCache.del("products")
    return res.json({
        success:true,
        message:"Updated"
    })
})

app.listen(5000,()=>{
    console.log("Working")
})
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
async function generateProducts(count = 10) {
    const products = [];
    for (let i = 0; i < count; i++) {
        const newProduct = {
            name: faker.commerce.product(),
            photo: faker.image.avatar(),
            price: faker.commerce.price({ min: 1500, max: 80000, dec: 0 }),
            stock: getRandomInt(0, 100),
            category: faker.commerce.department(),
            createdAt: new Date(faker.date.past()),
            updatedAt: new Date(faker.date.recent()),
        };  
        products.push(newProduct) 
        console.log('Add Record');
    }
    await Product.create(products)
    console.log('Check DB');
}
generateProducts(10)  //for creating sample product