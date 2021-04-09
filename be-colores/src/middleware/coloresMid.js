var router = require('express').Router();
const authController = require('../controller/authController');

router.use((req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const userIsValid = authController.validarToken(token);
    if (userIsValid) {
        next();
    } else {
        res.send({ cod: 401, msj: 'Invalid Token' });
    }
}, (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const user = authController.decodeToken(token);
    const noAccessAdmin = [];
    const noAccessUser = ['POST','PUT','DELETE'];
    if(!((user.tipo === 'ADMINISTRADOR')?noAccessAdmin:noAccessUser).includes(req.method)){
        next();    
    } else {
        res.send({ cod: 401, msj: 'No tienes permiso para ejecutar este metodo' });
    }

});

module.exports = router