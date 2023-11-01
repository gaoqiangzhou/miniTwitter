import mongoose from "mongoose";

const postSchema = mongoose.schema({
    myFile: string
})

export default mongoose.models.posts || mongoose.model('post',postSchema)