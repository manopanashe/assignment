const Sale = require("../models/Sale");
const bodyParser = require("body-parser");

exports.list = async(req,res) =>{
    const perPage = 10;
  const limit = parseInt(req.query.limit) || 10; // Make sure to parse the limit to number
  const page = parseInt(req.query.page) || 1;
  const message = req.query.message;

    try{
        const JCsales = await Sale.find({}).skip((perPage * page )- perPage).limit(limit);
        const count = await Sale.find({}).count();
        const numberOfPages = Math.ceil(count / perPage);
    
        res.render("JCsales",{
            JCsales:JCsales,
            numberOfPages: numberOfPages,
            currentPage: page,
            message: message  
        });

    }catch(e){
        res.status(404).send({message:"cound not list sales"})
    };
}
exports.edit = async (req, res) => {
    const id = req.params.id;
    try {
      const sale =  await Sale.findById(id);
      res.render('update-sale', { sale: sale, id: id });
    } catch (e) {
      res.status(404).send({
        message: `could not find sale ${id}.`,
      });
    }
  };
  exports.update = async (req, res) => {
    const id = req.params.id;
    try {
     const sale =  await Sale.updateOne({ _id: id }, req.body);
      res.redirect('/JCsales/?message=store sale  has been updated');
      console.log("running")
    } catch (e) {
      res.status(404).send({
        message: `could not find sale ${id}.`,
      });
    }
  };
  exports.delete = async (req, res) => {
    const id = req.params.id;
  
    try {
  
      await Store.findByIdAndRemove(id);
  res.redirect("/JCsales");
    } catch (e) {
      res.status(404).send({
        message: `could not delete  record ${id}.`,
      });
    }
  };

  exports.create = async(req,res) => {
    try {
      const sale = new Sale({ store_number:req.body.store_number, Weekly_sales: req.body.Weekly_sales });
      await sale.save();
      res.redirect('/JCsales/?message= sale has been created')
    } catch (e) {
      if(e.errors){
        console.log(e.errors);
        res.render('create-sale', {errors: e.errors})
        return;
      }return res.status(400).send({
        message: JSON.parse(e),
      });
      
    }
  }