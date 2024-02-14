import mongoose from "mongoose";

const profilepictureSchema = mongoose.Schema({
    userid: {type: String, required: true},
    file: {type: String, required: true},
    filename: {type: String, required: true}
});

export default mongoose.model("profilepicture", profilepictureSchema);