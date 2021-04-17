const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    confirmPassword:{
        type: String,
        required: true
    },
    admin:{
        type: Boolean,
        required: true,
        default: false
    },
    cart: {
        items: [{
            productId : {
                type: Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity:{
                type: Number,
                required: true
            }
        }]
    }
})


module.exports = mongoose.model("User", userSchema)