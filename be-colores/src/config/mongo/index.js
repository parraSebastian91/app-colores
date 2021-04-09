'use strict';
const env = require('node-env-file'); // .env file
env('.env');
const mongoose = require('mongoose');
const mongoConectionString =`mongodb+srv://${process.env.mongoUSER}:${process.env.mongoPASS}@${process.env.mongoServer}`;
mongoose.connect(mongoConectionString);
module.exports = mongoose;
