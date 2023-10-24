const express = require('express')
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require("./Models/user");

app.use(cors());
app.use(express.json());

app.get('/', (req, res)=>{
    res.send("Hello")
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