const mongoose = require("mongoose");
const {Schema} = mongoose;

const salesSchema = new Schema({
    Store: Number,
    Dept: Number,
    Weekly_sales: Number,
},{timestamps:true});
module.exports = mongoose.model("Sales",salesSchema);