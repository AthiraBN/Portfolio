import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import userRouter from './routes/user.js';
import personaldetailsRouter from './routes/personaldetails.js';
import profilepictureRouter from "./routes/profilepicture.js";
import experienceRouter from "./routes/experience.js";

const app = express();

app.use(morgan('dev'));
app.use(express.json({limit:"30mb", extended: true}));
app.use(express.urlencoded({limit:"30mb", extended: true}));
app.use(cors());

app.use('/users', userRouter); // http://localhose:5000/users/signup
app.use('/personaldetails', personaldetailsRouter); // http://localhose:5000/personaldetails
app.use('/profilepicture', profilepictureRouter); // http://localhose:5000/profilepicture
app.use('/experience', experienceRouter); // http://localhose:5000/experience

const MONGODB_URL = 'mongodb+srv://admin:Vt2Zz46sx38XEm1t@cluster0.umhstnn.mongodb.net/'

const port = 5000;

mongoose.connect(MONGODB_URL).then(() => {
    app.listen(port, () => {
        console.log('Server running on:' + port);
    })
}).catch((err) => {
    console.log(err);
})