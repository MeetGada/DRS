// const express = require ("express")
const cors = require("cors")
const mongoose = require("mongoose")

// const app = express()
const express = require("express")
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

const ConversationSchema = new mongoose.Schema({
    members:Array,
},{ timestamps: true })

const Conversation = new mongoose.model("Conversation", ConversationSchema)

app.post("/", async (req, res)=>{
    console.log(req.body)

    try {
        const newConv = new Conversation({
            members: [req.body.senderId, req.body.receiverId]
        })
        const saveConv = await newConv.save()
        res.status(200).json(saveConv)
    } catch (err) {
        res.status(500).json(err)
    }
})

app.listen(9002,() => {
    console.log("BE started at port 9002")
})