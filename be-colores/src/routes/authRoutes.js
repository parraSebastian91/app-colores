var router = require('express').Router();
const authController = require('../controller/authController');

/**
 * GetToken
 */
router.get('/getToken', (req, res) => {
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