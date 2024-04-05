"use strict";

const Interest = require("../models/interest");

const getInterests = async (req, res) => {
    try {
        const interests = await Interest.find();
        console.dir(interests);
        res.status(200).json(interests);
    } catch (err) {
        console.error(err);
    }
}

module.exports = {getInterests}