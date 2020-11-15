const Features = require("../models/Features");

exports.list = async(req,res) =>{
    try{
        const feature = await Features.find({});
        res.render("feature",{feature: feature});
    }catch(e){
        res.status(404).send({message:"could not list features"})
    }
};