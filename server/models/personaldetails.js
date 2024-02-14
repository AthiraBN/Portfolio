import mongoose from "mongoose";

const personaldetailsSchema = mongoose.Schema({
    userid: {type: String, required: true},
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    emailid: {type: String, required: true},
    phonenum: {type: String, required: true},
    dob: {type: String, required: true},
    age : {type: String, required: true},
    maritalstatus: {type: String, required: false},
    address: {type: String, required: true}
});

export default mongoose.model("personalDetail", personaldetailsSchema);