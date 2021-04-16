
'use strict';
const mongoose = require('../config/mongo/index');
const color_Schema = require('./colorSchema');
const persona_Schema = require('./personaSchema');
const Schema = mongoose.Schema;

const Schemas = {
    ColorSchema: new Schema(color_Schema),
    PersonaSchema: new Schema(persona_Schema),
};

module.exports = Schemas;
