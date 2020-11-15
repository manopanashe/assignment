const Sales = require("../models/Sales");

exports.list = async(req,res) =>{
    try{
        const sales_data = await Sales.find({});
        res.render("sales_data",{sales_data:sales_data,users:"panashe"});

    }catch(e){
        res.status(404).send({message:"cound not list sales"})
    };
}