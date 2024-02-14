import mongoose from "mongoose";

const experiencesSchema = mongoose.Schema({
    userid: {type: String, required: true},
    orgname: {type: String, required: true},
    responsibilities: {type: String, required: true},
    acheivements: {type: String, required: true},
    projDtls: {type: String, required: true},
    projLinks: {type: String, required: false},
    desgination : {type: String, required: true},
    skills: {type: String, required: true},
    fromdate: {type: String, required: true},
    todate: {type: String, required: true}
});

export default mongoose.model("experienceDetail", experiencesSchema);