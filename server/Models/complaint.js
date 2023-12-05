const mongoose = require("mongoose");
const complaintSchema = new mongoose.Schema({
    by: {
        type: String,
        required: true,
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    },
    reason:{
        type: String,
        required: true,
    },
    to:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
})
const Complaint = new mongoose.model("Complaint", complaintSchema);
module.exports = Complaint;