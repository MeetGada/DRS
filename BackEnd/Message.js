const cors = require("cors")
const mongoose = require("mongoose")
// const express = require("express")

const router = require("express").Router()

const MessageSchema = new mongoose.Schema({
    conversationId: String,
    sender: String,
    text: String
  },{ 
    timestamps: true 
  })

const Message = mongoose.model("Message", MessageSchema)

router.post("/", async (req, res) => {
    const newMessage = new Message(req.body);
  
    try {
      const savedMessage = await newMessage.save();
      res.status(200).json(savedMessage);
    } catch (err) {
      res.status(500).json(err);
    }
});
  
  //get
  
  router.get("/:conversationId", async (req, res) => {
    try {
      const messages = await Message.find({
        conversationId: req.params.conversationId,
      });
      console.log("Messages Fetched Successfully")
      res.status(200).json(messages);
    } catch (err) {
      res.status(500).json(err);
    }
  });  

module.exports = router