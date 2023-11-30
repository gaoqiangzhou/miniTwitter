const mongoose = require("mongoose");
const Decimal128 = require("mongoose/lib/schema/decimal128");
const tipsschema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiver: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  tipAmount: [
    {
      type: Number,
      required: true,
    },
  ],
});
const Tip = new mongoose.model("Tip", tipsschema);
module.exports = Tip;
