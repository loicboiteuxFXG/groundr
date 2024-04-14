"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName : {
        type : String,
        required: true,
        unique: true,
    },
    lastName : {
        type : String,
        required: true,
        unique: true,
    },
    email : {
        type : String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, "Adresse courriel invalide"],
    },
    password : {
        type : String,
        required: true,
        minlength: 6
    },
    gender : {
        type: String,
        required: true,
        maxlength: 1,
        minlength: 1
    },
    orientation: {
        type: String,
        required: true,
        maxlength: 1,
        minlength: 1
    },
    interests: {
        type: [{
            type: Schema.Types.ObjectId,
            required: true,
            ref: "interest"
        }],
        validate: [(val) => val.length > 0 && val.length <= 5, 'Doit avoir entre 1 et 5 intérêts.']
    },
    DoB: {
        type: Schema.Types.Date,
        required: true
    },
    bio: {
        type: String,
        required: true,
        default: ""
    },
    pfpURL: {
        type: String,
        required: true,
        default: "default-user.png"
    }
},{
    timestamps: false
});


module.exports = mongoose.model("user", userSchema);