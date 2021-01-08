const Store = require('../models/Store');
const bodyParser = require('body-parser');


exports.list = async (req, res) => {
  const perPage = 5;
  const limit = parseInt(req.query.limit) || 5;
  const page = parseInt(req.query.page) || 1;
  const message = req.query.message;
  try {
    const JCstores = await Store.find({}).skip((perPage * page) - perPage).limit(perPage);
    const count = await Store.find({}).count();
    const numberOfPages = Math.ceil(count / page);

    res.render("JCstores",
      {
        JCstores: JCstores,
        numberOfPages: numberOfPages,
        currentPage: page,
        message: message
      });
    console.log('running');
    res.redirect('/JCstore/?message store updated')
  } catch (e) {
    console.log(e)
    res.status(404).send({ message: "could not list stores" })
  }
};

exports.edit = async (req, res) => {
  const id = req.params.id;
  try {
    const store = await Store.findById(id);
    res.render('update-store', { store: store, id: id });
  } catch (e) {
    res.status(404).send({
      message: `could find store ${id}.`,
    });
  }
};
exports.update = async (req, res) => {
  const id = req.params.id;
  try {
    const store = await Store.updateOne({ _id: id }, req.body);
    res.redirect('/JCstores/?message=store  has been updated');
  } catch (e) {
    res.status(404).send({
      message: `could not find store ${id}.`,
    });
  }
};
exports.delete = async (req, res) => {
  const id = req.params.id;

  try {

    await Store.findByIdAndRemove(id);
    res.redirect("/JCstores");
  } catch (e) {
    res.status(404).send({
      message: `could not delete  record ${id}.`,
    });
  }
};

exports.create = async (req, res) => {
 
  try {
    const store = new Store({ province: req.body.province,store_number: req.body.store_number, size: req.body.size, type: req.body.type });
    await store.save();
    res.redirect('/JCstores/?message=store has been created')
  } catch (e) {
    if (e.errors) {
      console.log(e.errors);
      res.render('create-store', { errors: e.errors })
      return;
    }
    return res.status(404).send({
      message: JSON.parse(e),
    })}
};