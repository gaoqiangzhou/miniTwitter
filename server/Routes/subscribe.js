const express = require("express");
const router = express.Router();
const User = require("../Models/user");
const Subscribe = require("../Models/subscribe");

//subscribe a user
router.post("/", async (req, res) => {
    const {followId, followerId} = req.body;

    if(followId === "" || followerId ===""){
        res.json({
            status: "FAILED",
            message: "invalid Id"
    })} else
    {
        try{
            //find for follow id
            let query = { userId: followId };
            let updateData = { $addToSet : {follower: followerId}};
            let options = { upsert: true, returnDocument: 'after' };
            let doc = await Subscribe.findOneAndUpdate(query, updateData, options);
            await doc.save();
            //find for follwer id
            query = { userId: followerId };
            updateData = { $addToSet : {following: followId}};
            doc = await Subscribe.findOneAndUpdate(query, updateData, options);
            await doc.save();
            res.json({
                status: "SUCCESS",
                message: "successfully subscribe"
              });
        } catch (error) {
            res.json({
              status: "FAILED",
              message: "Error occurred find and update",
              error: error.message,
            });
          }
        
    }
})
module.exports = router;