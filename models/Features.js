const mongoose = require("mongoose");
const{Schema} = mongoose;

const featureSchema = new Schema({
    store: Number,
    Date: String,

},{timestamps:true});