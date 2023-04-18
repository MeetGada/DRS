const mongoose = require("mongoose")
const router = require("express").Router()
const User = require("./Login").User

const rideSchema = new mongoose.Schema({
    driveCost: String, 
    capacity: String, 
    originAddress: String, 
    destAddress: String, 
    departAt: String,
    name: String,
    walletAddress: String,
    userId: String
})

const Ride = new mongoose.model("Ride", rideSchema)

router.get("/ride/:walletAddress", async (req, res) => {
    try {
      const ride = await Ride.find({
        walletAddress: req.params.walletAddress,
      });

    //   console.log(ride, User)
    //   const userDetails = await User.findOne({
    //     _id: ride.userId,
    //   }); 
      console.log("Ride Details fetched successfully")
      res.status(200).json(ride);
    } catch (err) {
      res.status(500).json(err);
    }
}); 

router.post("/rideDetails", async (req, res) => {
    const newRide = new Ride(req.body);
    try {
      const savedRide = await newRide.save();
      res.status(200).json(savedRide);
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router
  