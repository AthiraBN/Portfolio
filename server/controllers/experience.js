import experience from "../models/experience.js";

export const add = async(req, res) => {

    console.log(req.body, 'aaa');

    const {userid, organizationName, responsibilities,achievements,projectDtls, projectLinks,
        designation, skills, fromDate, toDate} = req.body;

    try {

        const result = await experience.create({
            userid,
            orgname: organizationName,
            responsibilities: responsibilities,
            acheivements: achievements,
            projDtls: projectDtls,
            projLinks: projectLinks,
            desgination: designation,
            skills: skills,
            fromdate: fromDate,
            todate: toDate
        });

        return res.status(201).json({result});
        
    } catch(error) {
        res.status(400).json({message: 'Something went wrong'});
        console.log(error);
    }
}

export const edit = async(req, res) => {

    console.log(req.params.id);

    experience.find({userid: req.params.id}).then(exp => res.json(exp))
        .catch(err=>res.status(400).json('Error '+err));
    
}

export const update = async(req, res) => {

    console.log(req.body);

    const {userid, organizationName, responsibilities,achievements,projectDtls, projectLinks,
        designation, skills, fromDate, toDate} = req.body;

    try {

        const result = await experience.findByIdAndUpdate({ _id: req.params.id },{
            userid,
            orgname: organizationName,
            responsibilities: responsibilities,
            acheivements: achievements,
            projDtls: projectDtls,
            projLinks: projectLinks,
            desgination: designation,
            skills: skills,
            fromdate: fromDate,
            todate: toDate
        });

        return res.status(201).json({result});
        
    } catch(error) {
        res.status(400).json({message: 'Something went wrong'});
        console.log(error);
    }
}

export const remove = async(req, res) => {

    try {
        const result = await experience.findByIdAndDelete(req.params.id); 
        console.log(result);
        return res.status(201).json({result});
        
    } catch(error) {
        res.status(400).json({message: 'Something went wrong'});
        console.log(error);
    }
}