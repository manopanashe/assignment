const mongoose = require("mongoose");
const {Schema} = mongoose;

const storeSchema = new Schema({
    Store_number: String,
    Size:String,
    type:String,
},
{timestamps:true});

module.exports = mongoose.model("Stores",storeSchema);