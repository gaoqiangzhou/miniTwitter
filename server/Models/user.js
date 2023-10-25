const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    type: {
        type: String,
        require: true,
        enum: {
            values: ["SU", "CU", "TU", "OU"],
            message: "{value} not supproted"
        }
    },
    password: {
        type: String,
        require: true
    }
})
const User = new mongoose.model("User", userSchema);
module.exports = User;