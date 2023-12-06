const mongoose = require("mongoose");
const disputeMessageSchema = new mongoose.Schema({
    complain:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Complaint",
        required: true,
    },
    from:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    disputeReason:{
        type:String,
        required: true,
    },
    approved:{
        type: Boolean,
        default: null,
    }
})
const DisputeMessage = new mongoose.model("DisputeMessage", disputeMessageSchema);
module.exports = DisputeMessage;