const express=require("express");
const ErrorHandler=require("./middleware/Error")
const cookieParser=require("cookie-parser")
const bodyParser=require("body-parser")
const user=require("./controller/user")
const app=express();
const cors =require("cors")
app.use(cors({
    "origin":"*",
}))
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}));
app.use("/",express.static("uploads"))
app.use("/api/user",user)
app.use(cookieParser())
app.use(express.json())



if(process.env.NODE_ENV!="PRODUCTION"){
    require("dotenv").config({
        path:"./config/.env"
    })
}

app.use(ErrorHandler)
module.exports=app;