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
        const complaint = await Complaint.findOne({_id: complaintId})
        const dispute = await DisputeMessage.create({complain: complaintId, from: userId, disputeReason: reason});
        res.json({
            status: "SUCCESS",
            message: "Success to send the dispute",
            dispute: {_id: dispute._id, from: dispute.from, disputeReason: dispute.disputeReason, complain: complaint}
        })
    } catch (error) {
    res.json({
      status: "FAILED",
      message: "Error occurred while send a dispute",
      error: error.message,
    });
  }
})
//get all unprocessed disputes
router.get("/", async (req, res) => {
  try{
    const disputes = await DisputeMessage.find({approved: "Unprocessed"})
    const newDisputes = await Promise.all(
                        disputes
                        .map(async (ea) => ({
                          _id: ea._id,
                          from: ea.from,
                          disputeReason: ea.disputeReason,
                          complain: await Complaint.findOne({_id: ea.complain+""})
                        })))

    res.json({
      status: "SUCCESS",
      message: "get all unprocessed disputes",
      disputes: newDisputes
    });

  } catch (error) {
    res.json({
      status: "FAILED",
      message: "Error occurred while send a dispute",
      error: error.message,
    });
  }
})
//process dispute
router.put("/:disputeId", async (req, res) => {
  const disputeId = req.params.disputeId;
  const {approved} = req.body;
  //if win the dispute
  //mark dispute approved to true
  //remove complain (user, post, or profile)
  //punish reporter
  //if surfer: reward user
  try{
    if(approved === "Yes")
    {
      await DisputeMessage.findOneAndUpdate({_id: disputeId}, {approved: "Yes"})
      res.json({
        status: "SUCCESS",
        message: "disputed",
      })
    }else
    {
      await DisputeMessage.findOneAndUpdate({_id: disputeId}, {approved: "No"})
      res.json({
        status: "SUCCESS",
        message: "disputed not approve",
      })
    }
  }catch (error) {
    res.json({
      status: "FAILED",
      message: "Error occurred while process a dispute",
      error: error.message,
    });
  }

  //if not

})

module.exports = router;