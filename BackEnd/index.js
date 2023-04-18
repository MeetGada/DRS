// import { Schema, model } from 'mongoose'
// import cors from "cors"
// import { Router, express } from 'express'

const cors = require("cors")
const mongoose = require("mongoose")
const express = require("express")

const conversations = require("./Conversation")
const messages = require("./Message")
const login = require("./Login")
const rideDetails = require("./RideDetails")


const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/Rideshare", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
 }).then(() => {
  console.log("DB connected");
 }).catch((err) => {
  console.error(err);
});

app.use('/api/startConversation', conversations)
app.use('/api/messages', messages)
app.use('/api/', rideDetails)
app.use('/', login)

app.listen(9002,() => {
    console.log("BE started at port 9002")
})