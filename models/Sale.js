const mongoose = require("mongoose");
const {Schema} = mongoose;

const saleSchema = new Schema({
    store_number: String,
    Dept: String,
    Weekly_sales: String,
    Date: String,
},{timestamps:true});
module.exports = mongoose.model("Sale",saleSchema);