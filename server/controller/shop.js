const express = require("express");
const path = require("path");
const router = express.Router();
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const sendToken = require("../utils/jwt");
const Shop = require("../models/shop");
const {isSeller} = require("../middleware/auth");
const { upload } = require("../multer");
const AsyncError = require("../middleware/AsyncError");
const ErrorHandler = require("../utils/ErrorHandler");
const sendShopToken = require("../utils/shopToken");

router.post("/create-shop", upload.single("file"), async (req, res, next) => {
    try {
      const { email } = req.body;
      const sellerEmail = await Shop.findOne({ email });
      if (sellerEmail) {
        const filename = req.file.filename;
        const filePath = `uploads/${filename}`;
        fs.unlink(filePath, (err) => {
          if (err) {
            console.log(err);
            res.status(500).json({ message: "Error deleting file" });
          }
        });
        return next(new ErrorHandler("User already exists", 400));
      }
  
      const filename = req.file.filename;
      const fileUrl = path.join(filename);
  
      const seller = {
        name: req.body.name,
        email: email,
        password: req.body.password,
        avatar: fileUrl,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        zipCode: req.body.zipCode,
      };
  
      const activationToken = createActivationToken(seller);
  
      const activationUrl = `http://localhost:3000/seller/activation/${activationToken}`;
  
      try {
        await sendMail({
          email: seller.email,
          subject: "Activate your Shop",
          message: `Hello ${seller.name}, please click on the link to activate your shop: ${activationUrl}`,
        });
        res.status(201).json({
          success: true,
          message: `please check your email:- ${seller.email} to activate your shop!`,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  });
  
  // create activation token
  const createActivationToken = (seller) => {
    return jwt.sign(seller, process.env.ACTIVATION_SECRET, {
      expiresIn: "30m",
    });
  };
  
  // activate user
  router.post(
    "/activation",
    AsyncError(async (req, res, next) => {
      try {
        const { activation_token } = req.body;
        // console.log(activation_token)
        const newSeller = jwt.verify(
          activation_token,
          process.env.ACTIVATION_SECRET
        );
        //console.log("verified")
        if (!newSeller) {
          return next(new ErrorHandler("Invalid token", 400));
        }
        const { name, email, password, avatar, zipCode, address, phoneNumber } =
          newSeller;
        
        let seller = await Shop.findOne({ email });
        
        if (seller) {
          return next(new ErrorHandler("User already exists", 400));
        }
        try{
        seller = await Shop.create({
          name,
          email,
          avatar,
          password,
          zipCode,
          address,
          phoneNumber,
        });
      }catch(err){
        console.log(err)
      }
       
        sendShopToken(seller, 201, res);
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    })
  );


  router.post(
    "/login-shop",
    AsyncError(async (req, res, next) => {
      try {
        const { email, password } = req.body;
  
        if (!email || !password) {
          return next(new ErrorHandler("Please provide the all fields!", 400));
        }
  
        const user = await Shop.findOne({ email }).select("+password");
  
        if (!user) {
          return next(new ErrorHandler("User doesn't exists!", 400));
        }
  
        const isPasswordValid = await user.comparePassword(password);
  
        if (!isPasswordValid) {
          return next(
            new ErrorHandler("Please provide the correct information", 400)
          );
        }
  
        sendShopToken(user, 201, res);
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    })
  );
  

  router.get(
    "/getSeller",
    isSeller,
    async (req, res, next) => {
      try {
        //console.log("1")
        const seller = await Shop.findById(req.seller._id);
        //console.log("found")
        if (!seller) {
          return next(new ErrorHandler("User doesn't exists", 400));
        }
  
        res.status(200).json({
          success: true,
          seller,
        });
      } catch (error) {
        console.log(error)
        return next(new ErrorHandler(error.message, 500));
        
      }
    }
  );
  
  // log out from shop
  router.get(
    "/logout",
    AsyncError(async (req, res, next) => {
      try {
        res.cookie("seller_token", null, {
          expires: new Date(Date.now()),
          httpOnly: true,
        });
        res.status(201).json({
          success: true,
          message: "Log out successful!",
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    })
  );
  


module.exports = router;