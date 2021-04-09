var router = require('express').Router()
const coloresRoutes = require('./routes/colorRoutes')
const coloresMiddleware = require('./middleware/coloresMid')
const authRoutes = require('./routes/authRoutes')
router.use('/colores', coloresMiddleware)
router.use('/colores', coloresRoutes)

router.use('/auth', authRoutes)

router.get('/', function(req, res) {
    res.status(200).json({ message: 'Estás conectado a nuestra API' })
})

module.exports = router