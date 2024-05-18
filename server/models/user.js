"use strict";
const mongoose= require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName : {
        type : String,
        required: true
    },
    lastName : {
        type : String,
        required: true
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
    },
    isPremium: {
        type: Boolean,
        required: true,
        default: false
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
    },
    location: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true,
            default: "Point"
        },
        coordinates: {
            type: [Number],
            required: true,
            default: [0, 0]
        }
    },
    range: {
        type: Number,
        required: true,
        default: 10
    },
    isBlocked: {
        type: Boolean,
        required: true,
        default: false
    },
    isAdministrator: {
        type: Boolean,
        required: true,
        default: false
    }
},{
    timestamps: false
});


module.exports = mongoose.model("user", userSchema);