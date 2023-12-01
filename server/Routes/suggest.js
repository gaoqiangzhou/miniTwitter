const express = require("express");
const router = express.Router();
const Post = require("../Models/post");
const User = require("../Models/user");
const Tip = require("../Models/tip");
const Subscribe = require("../Models/subscribe");

router.get("/:userId", async (req, res) => {
    const userId = req.params.userId;
    //first find all users the liked
    const likedUsersId = (await Post.find({"likes.user": {$in: [userId]}}))
                         .map((ea) => ea.userId)
    //find all tipped users
    const tippedUsersId = (await Tip.find({sender: userId}))
                          .map((ea) => ea.receiver)
    //find all read users
    const readUserId = (await Post.find({reads: {$in: [userId]}}))
                      .map((ea) => ea.userId)
    //find the user's following's following
    const followingsId = (await Subscribe.findOne({ userId: userId }))
                        .following
                        .map((ea) => ea + "")
    const followingsFollowingId = (await Promise.all(
                                followingsId
                                .map(async (ea) => Subscribe.findOne({ userId: ea }))))
                                .map((ea) => ea.following)
                                .flat()
    //combines all users and remove dups and already follows and iteself
    const suggestUsers = (await Promise.all(
                         [...likedUsersId, ...tippedUsersId, ...readUserId, ...followingsFollowingId]
                         .map((ea) => ea + "")
                         .filter((ea, pos, self) => self.indexOf(ea) === pos)//remove dup
                         .filter((ea) => !followingsId.includes(ea))//remove already follows
                         .filter((ea) => ea != userId)//remove itself
                         .map(async (ea) => User.findOne({ _id: ea }))))
                         .map((ea) => ({_id: ea._id, name: ea.name}))
                         
    res.send(suggestUsers)
})

module.exports = router;