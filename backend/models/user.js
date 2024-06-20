import mongoose, { Schema } from "mongoose";
const userSchema = new Schema({
    name: {
        type: String,
        required : true,
    },
    username : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    role: {
        type : String,
        default : "Customer"
    },
    created_orders : [{
        type : Schema.Types.ObjectId,
        ref : "Order",
        default : []
    }]
})

export const User = mongoose.model("User",userSchema)