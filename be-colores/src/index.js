var router = require('express').Router()
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const coloresRoutes = require('./routes/colorRoutes')
const coloresMiddleware = require('./middleware/coloresMid')
const authRoutes = require('./routes/authRoutes')

var cors = require('cors');

router.use(cors({
    origin: '*'
}));

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "libreria API-Colores",
            version: '1.0.0',
            contact:'Sebastian Parra',
            email: 'parra.sebastian91@gmail.com'
        },
    },
    apis: ["./src/routes/**.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));


router.use('/colores', coloresMiddleware)
router.use('/colores', coloresRoutes)

router.use('/auth', authRoutes)

router.get('/', function (req, res) {
    res.status(200).json({ message: 'Estás conectado a nuestra API' })
})

module.exports = router