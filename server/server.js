const express = require('express')
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const userRoute = require("./Routes/user")
const post = require('./Models/post.model.js');

app.use(cors());
app.use(express.json());
app.use("/user", userRoute);

app.get('/',(req,res) =>{
    try{
        post.find({}).then (data =>{
            res.json(data)
        }).catch(error => {
            res.status(408).json({error})            
        })
    }catch(error){
        res.json({error})
    }
})


/** post */
app.post("/upload", async(req,res) =>{
    const body = req.body;
    try{
        const newImage = await post.create(body)
        newImage.save();
        res.status(201).json({msg: "new image uploaded...!"})
    }catch(error){
        res.status(409).json({message: error.message})
    }
})

mongoose.connect('mongodb+srv://zhou:cc12112@cluster0.ebnlf4j.mongodb.net/MiniTwitter?retryWrites=true&w=majority')
.then(()=>{
    app.listen(3000, ()=>{
        console.log("Mini Twitter is running at port 3000")
    })
    console.log('connected to MongoDB')
}).catch((error) => {
    console.log(error)
})