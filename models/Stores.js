const mongoose = require("mongoose");
const {Schema} = mongoose;

const storeSchema = new Schema({
    store: String,
    size:String,
    type:String,
},
{timestamps:true});

module.exports = mongoose.model("Stores",storeSchema);