const Feature = require("../models/Feature");

exports.list = async (req, res) => {
    const perPage = 10;
    const limit = parseInt(req.query.limit) || 10; // Make sure to parse the limit to number
    const page = parseInt(req.query.page) || 1;
    const message = req.query.message;
    try {
        const JCfeatures = await Feature.find({}).skip((perPage * page) - perPage).limit(limit);
        const count = await Feature.find({}).count();
        const numberOfPages = Math.ceil(count / perPage);
        res.render("JCfeatures", {
            JCfeatures: JCfeatures,
            numberOfPages: numberOfPages,
            currentPage: page,
            message: message
        });
        console.log('features')
    } catch (e) {
        res.status(404).send({ message: "could not list features" })
    }
};

exports.edit = async (req, res) => {
    const id = req.params.id;
    try {
        const feature = await Feature.findById(id);
        res.render('update-feature', { 
            feature: feature, id: id });
    } catch (e) {
        res.status(404).send({
            message: `could not find feature ${id}.`,
        });
    }
};
exports.update = async (req, res) => {
    const id = req.params.id;
    try {
        const feature = await Feature.updateOne({ _id: id }, req.body);
        res.redirect('/JCfeatures/?message=store feature  has been updated');
        console.log("running")
    } catch (e) {
        res.status(404).send({
            message: `could not find feature ${id}.`,
        });
    }
};
exports.delete = async (req, res) => {
    const id = req.params.id;

    try {

        await Feature.findByIdAndRemove(id);
        res.redirect("/JCfeatures");
    } catch (e) {
        res.status(404).send({
            message: `could not delete  record ${id}.`,
        });
    }
};

exports.create = async (req, res) => {
    let feature = new Feature({ store_number: req.body.store_number,  CPI: req.body.CPI });
    try {
       
        await feature.save();
        res.redirect('/JCfeature/?message= feature has been created')
    } catch (e) {
        if (e.errors) {
            console.log(e.errors);
            res.render('create-feature', { errors: e.errors })
            return;
        } return res.status(400).send();

    }
}