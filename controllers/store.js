const Stores = require('../models/Stores');

exports.list = async (req,res) =>{
    try{
        const JCstores = await Stores.find({});
        res.render("JCstores",{JCstores: JCstores});
        console.log('running');

    }catch(e){
        console.log(e)
        res.status(404).send({message:"could not list stores"})
    }
};