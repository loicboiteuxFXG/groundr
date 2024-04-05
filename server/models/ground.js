"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = require("./user");

const groundSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    status: {
        type: String,
        required: true
    }
},{
    timestamps: true
});


module.exports = mongoose.model("ground", groundSchema);