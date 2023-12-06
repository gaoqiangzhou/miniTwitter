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
            let data1 = await doc   
            .model("Complaint")
            .findOne({_id: await doc.complain})
            //console.log(data)
            if(data1.complaintType === "post")
            {
                //remove complaint from post and user and complaint
                await doc   
                .model("Complaint")
                .findOneAndRemove({_id: doc.complain})
                await doc
                .model("User")
                .findOneAndUpdate({_id: doc.from}, {$pull: {warns: doc.complain}})
                await doc
                .model("Post")
                .findOneAndUpdate({_id: data1.postId}, {$pull: {complaints: doc.complain}})
                //punish reporter
                if(data1.by === "Surfer")
                {
                    //reward 3 likes
                    await doc
                    .model("Post")
                    .findOneAndUpdate({_id: data1.postId}, {$inc: {rewardLikes: 3}})
                }
                else
                {
                    //warn the reporter
                    const newComplaint = await doc   
                    .model("Complaint")
                    .create({by: "SU", complaintType: "other", reason: "false report", to: data1.by})
                    await doc   
                        .model("User")
                        .updateOne({_id: data1.by}, {$push: {warns: newComplaint._id}})
                }
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