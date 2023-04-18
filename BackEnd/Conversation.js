// import { Schema, model } from 'mongoose'
// import cors from "cors"
// import { Router, express } from 'express'

// const app = express()
// app.use(express.json())
// app.use(express.urlencoded())
// app.use(cors())

const cors = require("cors")
const mongoose = require("mongoose")
const express = require("express")

const router = express.Router()

const ConversationSchema = new mongoose.Schema({
    members:Array,
},{ timestamps: true })

const Conversation = new mongoose.model("Conversation", ConversationSchema)

// create new Conversation
router.post("/", async (req, res)=>{
    // console.log(req.body)
    
    try {
      const conversation = await Conversation.findOne({
        members: { $all: [req.body.senderId, req.body.receiverId] },
      });
      if (conversation) {
        // console.log(`conversation:- ${conversation}`)
        res.status(200).json(conversation)
      } else {
        const newConv = new Conversation({
          members: [req.body.senderId, req.body.receiverId]
        })
        const saveConv = await newConv.save()
        res.status(200).json(saveConv)
      }
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get("/:userId", async (req, res) => {
    try {
      const conversation = await Conversation.find({
        members: { $in: [req.params.userId] },
      });
      // console.log(conversation)
      res.status(200).json(conversation);
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router