const express = require('express')
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

app.use(cors());
app.use(express.json());

app.get('/', (req, res)=>{
    res.send("Hello")
})

app.listen(3000, ()=>{
    console.log("Mini Twitter is running at port 3000")
})