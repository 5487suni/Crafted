const express=require("express");
const ErrorHandler=require("./middleware/Error")
const cookieParser=require("cookie-parser")
const bodyParser=require("body-parser")
const user=require("./controller/user")
const shop=require("./controller/shop")
const product=require("./controller/product")
const app=express();
const cors =require("cors")
app.use(cors({
    "origin":"http://localhost:3000",
    credentials:true,
}))
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}));
app.use("/",express.static("uploads"))

app.use(cookieParser())
app.use(express.json())



if(process.env.NODE_ENV!="PRODUCTION"){
    require("dotenv").config({
        path:"./config/.env"
    })
}

app.use(ErrorHandler)
app.use("/api/user",user)
app.use("/api/shop",shop)
app.use("/api/product",product)
module.exports=app;