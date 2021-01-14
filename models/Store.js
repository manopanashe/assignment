const mongoose = require("mongoose");
const {Schema} = mongoose;

const storeSchema = new Schema({
    province: { type: String, required: [true, 'Province is required'], minlength: [3, "Name must be 4 chars long"] },
    store_number: String,
    size:String,
    type:String,
},
{timestamps:true});

storeSchema.index({'$**': 'text'});
module.exports = mongoose.model("Store",storeSchema);