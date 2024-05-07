"use strict";

const Interest = require("../models/interest");

const getInterests = async (req, res, next) => {
    try {
        const interests = await Interest.find({})
        res.status(200).json(interests);
    } catch (err) {
        next(err)
    }
}

module.exports = {getInterests}