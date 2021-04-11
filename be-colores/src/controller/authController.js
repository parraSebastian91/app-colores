const persona = require('../models/models').persona;
const bcrypt = require('bcrypt');

var jwt = require('jsonwebtoken');
const env = require('node-env-file'); // .env file
env('.env');

const validarUsuario = async (usuario) => {
    let isValid = false;
    const resp = new Promise(async (resolve, reject) => {
        const persona = await getPersona(usuario.usuario).then(t => { return t })
        if (persona) {
            isValid = bcrypt.compareSync(usuario.password, persona.password);
            if (isValid) {
                delete persona.password;
                persona.isValid = isValid;
                resolve(persona);
            } else {
                reject();
            }
        } else {
            reject();
        }
    });
    return resp;
}

const createToken = (usuario) => {
    const resp = new Promise(async (resolve, reject) => {
        await validarUsuario(usuario)
            .then(t => {
                const persona = {
                    nombre: `${t.nombre} ${t.apellido}`,
                    tipo: t.tipo
                }
                resolve({ token: jwt.sign(persona, process.env.secret), cod: 200 })
            })
            .catch(err => {
                reject({ cod: 401, msj: "Usted no tiene credenciales vigentes" });
            });
    })
    return resp
}

const validarToken = (token) => {
    tokenIsValid = false;
    jwt.verify(token, process.env.secret, function (err, decoded) {
        tokenIsValid = (err) ? false : true;
    });
    return tokenIsValid
}

const decodeToken = (token) => {
    tokenDecode = false;
    jwt.verify(token, process.env.secret, function (err, decoded) {
        tokenDecode = (err) ? undefined : decoded;
    });
    return tokenDecode
}

/**
 * 
 * @param {STRING} nombre 
 * @returns PESONA
 */

const getPersona = (nombre) => {
    const resp = new Promise((resolve, reject) => {
        persona.findOne({ nombre })
            .then(t => resolve(t))
            .catch(err => resolve(err))
    });
    return resp;
}

const personaMethod = {
    createToken,
    validarToken,
    decodeToken
}

module.exports = personaMethod