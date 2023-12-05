const express = require("express");
const router = express.Router();
const Post = require("../Models/post");
const User = require("../Models/user");
const Complaint = require("../Models/complaint")

//complain a post
router.post("/", async (req, res) => {
    const { by, reason, to, type, postId } = req.body;
    try{
        if(type === "post")
        {
          const newComplaint = await Complaint.create({by: by, postId: postId, reason: reason, to: to, complaintType: type});
          await User.updateOne({_id: to}, {$push: {warns: newComplaint._id}})
          await Post.updateOne({_id: postId}, {$push: {complaints: newComplaint._id}})
          res.json({
            status: "SUCCESS",
            message: "Success to add the complain",
            complain: newComplaint
        })
        }
        // const newComplaint = await Complaint.create({by: by, postId: postId, reason: reason, to: to, complaintType: type});
        // console.log(newComplaint);
        // await User.updateOne({_id: to}, {$push: {warns: newComplaint._id}})
        // await Post.updateOne({_id: postId}, {$push: {complaints: newComplaint._id}})
        // res.json({
        //     status: "SUCCESS",
        //     message: "Success to add the complain",
        //     complain: newComplaint
        // })
    } catch (error) {
    res.json({
      status: "FAILED",
      message: "Error occurred while adding the complain",
      error: error.message,
    });
  }
})
//cancel a complaint from post
// router.put("/:postId", async (req, res) => {
//     const postId = req.params.postId;
//     const { postUserId, complainId } = req.body;
//     try{
//         await User.updateOne({_id: postUserId}, {$pull: {warns: complainId}})
//         await Post.updateOne({_id: postId}, {$pull: {complaints: complainId}})
//         await Complaint.deleteOne({_id: complainId});
//         res.json({
//             status: "SUCCESS",
//             message: "Success to cancel the complain",
//         })
//     }catch (error) {
//     res.json({
//       status: "FAILED",
//       message: "Error occurred while cancel the complain",
//       error: error.message,
//     });
//     }
// })

module.exports = router;