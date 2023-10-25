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
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    verified: {
        type: Boolean,
        default: false
    }
})
const User = new mongoose.model("User", userSchema);
module.exports = User;