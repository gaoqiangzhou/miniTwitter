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
        type: String,
        default: "Unprocessed"
    }
})
disputeMessageSchema.post("findOneAndUpdate", async (doc, next) => {
    try{
        if(doc.approved === "Yes")
        {
            //get complaint type
            let data = await doc   
            .model("Complaint")
            .findOne({_id: doc.complain})
            console.log(data)
            if(data.complaintType === "post")
            {
                //remove both complaint from post and user
                await doc   
                .model("Complaint")
                .findOneAndRemove({_id: doc.complain})
                await doc
                .model("User")
                .findOneAndUpdate({_id: doc.from}, {$pull: {warns: doc.complain}})
            }
        }
    }catch (error)
    {
        console.log("get error: ", error);
        next(error)
    }
})
const DisputeMessage = new mongoose.model("DisputeMessage", disputeMessageSchema);
module.exports = DisputeMessage;