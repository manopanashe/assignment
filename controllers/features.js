const Features = require("../models/Features");

exports.list = async(req,res) =>{
    try{
        const prediction = await Features.find({});
        res.render("prediction",{prediction: prediction});
    }catch(e){
        res.status(404).send({message:"could not list features"})
    }
};