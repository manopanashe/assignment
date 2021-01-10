const mongoose = require("mongoose");
const {Schema} = mongoose;

const storeSchema = new Schema({
    province: String,
    store_number: String,
    size:String,
    type:String,
},
{timestamps:true});

storeSchema.index({'$**': 'text'});
module.exports = mongoose.model("Store",storeSchema);