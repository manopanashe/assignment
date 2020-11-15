const Sales = require("../models/Sales");

exports.list = async(req,res) =>{
    try{
        const Sale = await Sales.find({});
        res.render("Sale",{Sale:Sale});

    }catch(e){
        res.status(404).send({message:"cound not list sales"})
    };
}