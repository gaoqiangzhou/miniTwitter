const express = require("express");
const router = express.Router();
const Post = require("../Models/post");
const User = require("../Models/user");
const Complaint = require("../Models/complaint")
const DisputeMessage = require("../Models/disputeMessage")

//send a dispute
router.post("/:complaintId", async (req, res) => {
    const complaintId = req.params.complaintId;
    const { userId, reason } = req.body;
    try{
        const dispute = await DisputeMessage.create({complain: complaintId, from: userId, disputeReason: reason});
        res.json({
            status: "SUCCESS",
            message: "Success to send the dispute",
            dispute: dispute
        })
    } catch (error) {
    res.json({
      status: "FAILED",
      message: "Error occurred while send a dispute",
      error: error.message,
    });
  }

})

module.exports = router;