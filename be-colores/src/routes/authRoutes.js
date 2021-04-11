var router = require('express').Router();
const authController = require('../controller/authController');

/**
 * @swagger
 * /auth/getToken:
 *   post:
 *     summary: obtiene token de autorización.
 *     description: obtencion de token de autorización según credenciales de usuarios.
 *     parameters:    
 *       - in: body
 *         name: usuario
 *         required: true
 *         description: Nombre de usuario.
 *         schema:
 *           type: string 
 *           required:
 *            - usuario
 *            - password
 *           properties:
 *             usuario:
 *               type: string
 *             password:
 *               type: string      
 *     responses:
 *       200:
 *         description: Retorna token de autorizacion.
 *       401: 
 *         description: Usted no tiene credenciales vigentes.
 */
router.post('/getToken', (req, res) => {
    const item = req.body;
    authController.createToken(item)
        .then(t => {
            res.send(t)
        })
        .catch(err => {
            res.send(err)
        })
})

module.exports = router