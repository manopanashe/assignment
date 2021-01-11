const mongoose = require("mongoose");
const{Schema} = mongoose;

const featureSchema = new Schema({

    store_number: String,
    Date: String,
    CPI:String,
    isHoliday:String,
    Temperature: String,

},
{timestamps:true});
module.exports = mongoose.model("Feature",featureSchema);