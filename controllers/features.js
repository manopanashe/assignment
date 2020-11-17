const Features = require("../models/Features");

exports.list = async(req,res) =>{
    try{
        const JCfeatures = await Features.find({});
        res.render("JCfeatures",{JCfeatures: JCfeatures});
    }catch(e){
        res.status(404).send({message:"could not list features"})
    }
};