'use strict';
const mongoose = require('../config/mongo'),
  colorSchema = require('../Schemas/schema').ColorSchema,
  personaSchema = require('../Schemas/schema').PersonaSchema;
  
const models = {
  color : mongoose.model('colores', colorSchema),
  persona : mongoose.model('usuarios', personaSchema)
};

module.exports = models;``