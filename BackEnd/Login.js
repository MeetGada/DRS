// import express from "express"
// import cors from "cors"
// import mongoose from "mongoose"
const mongoose = require("mongoose")
const router = require("express").Router()

const userSchema = new mongoose.Schema({
    email: String,
    name: String,
    mobile_no: String,
    driving_licence: String,
    password: String

})

const User = new mongoose.model("User", userSchema)

router.get("/user/:userId", async (req, res) => {
    try {
      const user = await User.find({
        _id: req.params.userId,
      });
      console.log("User fetched successfully")
      res.status(200).json(user[0]);
    } catch (err) {
      res.status(500).json(err);
    }
  }); 


//Routes
router.post("/login", async(req, res)=> {
    const { mobile_no, password} = req.body
    try {
        const user = await User.find({ mobile_no: mobile_no})
        console.log(user[0])
        if(user) {
            if(password === user[0].password ) {
                res.send({message: "Login Successfull", user: user[0]})
            } else {
                res.send({ message: "Password didn't match"})
            }
        } else {
            res.send({message: "User not registered"})
        }
    } catch (err) {
        console.log(err)
    }
}) 


router.post("/register", async(req, res)=> {
    const { email, name, driving_licence, mobile_no, password} = req.body
    console.log(mobile_no)
    try {
        const user = await User.find({mobile_no: mobile_no})
        // console.log(user)
        if(user.length != 0){
            console.log("user Exists")
            res.status(500).json({message: "User already registerd"})
        } else {
            const saveUser = new User({
                email,
                name,
                driving_licence,
                mobile_no,
                password
            })
            try {
                await saveUser.save().then(()=> {
                    console.log("User saved")
                    res.status(200).json({message: "Successfully Registered, Please login now."});
                })
                } catch(err) {
                console.log(`Following Error  Occured While Saving the Model:- ${err}`)
                res.status(500).json({message: "Internal Error Occured"});
            }
        }
    } catch(err) {
        console.log(err)
    }
});

router.get("/userCount", async(req,res)=> {
   const result = await User.count()
   if (!result){
    res.status(500).json({error:true,message:"No count found"})
   }

   res.status(200).json({success:true,message:result})
})

// app.listen(9002,() => {
//     console.log("BE started at port 9002")
// })

module.exports = router