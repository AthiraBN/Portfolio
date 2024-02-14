import personalDetail from "../models/personaldetails.js";

export const add = async(req, res) => {

    console.log(req.body);

    const {userid, firstName, lastName,email,phone, dob, age, maritalstatus, address} = req.body;

    try {

        const result = await personalDetail.create({
            userid,
            firstname: firstName,
            lastname: lastName,
            emailid: email,
            phonenum: phone,
            dob,
            age,
            maritalstatus,
            address
        });

        return res.status(201).json({result});
        
    } catch(error) {
        res.status(400).json({message: 'Something went wrong'});
        console.log(error);
    }
}

export const edit = async(req, res) => {

    console.log(req.params.id);

    personalDetail.findOne({userid: req.params.id}).then(persdtl => res.json(persdtl))
        .catch(err=>res.status(400).json('Error '+err));
    
}

export const update = async(req, res) => {

    console.log(req.body);

    const {userid, firstName, lastName, email,phone, dob, age, maritalstatus, address} = req.body;

    try {

        const result = await personalDetail.findByIdAndUpdate({ _id: req.params.id },{
            userid,
            firstname: firstName,
            lastname: lastName,
            emailid: email,
            phonenum: phone,
            dob,
            age,
            maritalstatus,
            address
        });

        return res.status(201).json({result});
        
    } catch(error) {
        res.status(400).json({message: 'Something went wrong'});
        console.log(error);
    }
}