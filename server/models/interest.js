"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const interestSchema = new Schema({
    value: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    }
},{
    timestamps: false
});


module.exports = mongoose.model("interest", interestSchema);