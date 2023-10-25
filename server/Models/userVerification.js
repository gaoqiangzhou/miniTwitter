const mongoose = require("mongoose");

const userVerificationSchema = new mongoose.Schema({
    userID: String,
    uniqueString: String,
    createdAt: Date,
    expireAt: Date
})
const userVerification = new mongoose.model("userVerification", userVerificationSchema);
module.exports = userVerification;