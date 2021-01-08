const mongoose = require("mongoose");
const{Schema} = mongoose;

const featureSchema = new Schema({
    store_number: String,
    Date: String,
    CPI:String,
    isHoliday:String,
    Mark_Down_id:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "MarkDowns",
    }
    

},
{timestamps:true});
module.exports = mongoose.model("Feature",featureSchema);