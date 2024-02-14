import profilepicture from "../models/profilepicture.js";

export const add = async(req, res) => {

    console.log(req.body);

    const {userid, file, fileName } = req.body;

    try {

        const result = await profilepicture.create({
            userid,
            file: file,
            filename: fileName
        });

        return res.status(201).json({result});
        
    } catch(error) {
        res.status(400).json({message: 'Something went wrong'});
        console.log(error);
    }
}

export const edit = async(req, res) => {

    profilepicture.find({userid: req.params.id}).then(exp => res.json(exp))
    .catch(err=>res.status(400).json('Error '+err));
    
}

export const update = async(req, res) => {

    console.log(req.body);

    const {userid, file, fileName } = req.body;

    try {

        const result = await profilepicture.findByIdAndUpdate({_id: req.params.id},{
            userid,
            file: file,
            filename: fileName
        });

        return res.status(201).json({result});
        
    } catch(error) {
        res.status(400).json({message: 'Something went wrong'});
        console.log(error);
    }
}