'use strict'

const { GetUser, GetAllUsers, CreateUser, UpdateUserPfp, UpdateUser } = require('./User');
const { GetAllGrounds, CreateGround, UpdateGround, DeleteGround } = require('./Ground');

module.exports = { CreateUser, GetAllUsers, GetUser, GetAllGrounds, CreateGround, UpdateGround, DeleteGround, UpdateUserPfp, UpdateUser };