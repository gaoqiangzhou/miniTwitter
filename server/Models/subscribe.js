const mongoose = require("mongoose");
const subscribeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    following:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }],
    follower:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }],
})
const Subscribe = new mongoose.model("Subscribe", subscribeSchema);
module.exports = Subscribe;