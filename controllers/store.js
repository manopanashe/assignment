const Stores = require('../models/Stores');

exports.list = async (req,res) =>{
    try{
        const stores = await Stores.find({});
        res.render("stores",{stores: stores});
        console.log('running');

    }catch(e){
        console.log(e)
        res.status(404).send({message:"could not list stores"})
    }
};