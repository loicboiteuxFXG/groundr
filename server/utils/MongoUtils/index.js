'use strict'

const { GetUser, GetAllUsers, CreateUser } = require('./User');
const { GetAllGrounds, CreateGround, UpdateGround, DeleteGround } = require('./Ground');

module.exports = { CreateUser, GetAllUsers, GetUser, GetAllGrounds, CreateGround, UpdateGround, DeleteGround };