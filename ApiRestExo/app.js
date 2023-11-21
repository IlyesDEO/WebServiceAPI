const sequelize = require('./src/db/sequelize')
const bodyParser = require('body-parser')
const morgan = require("morgan")
const express = require('express')
const app = express()
const port = 3000


app
.use(bodyParser.json())
.use(morgan('dev'))

require('./src/routes/exoMuscu')(app)
require('./src/routes/login')(app)
sequelize.initDb()
/*app.use(({res}) => {
    const message = "impossible de trouver la ressource demandée"
    res.status(404).json({message})
})*/


app.listen(port, () => console.log(`Lancement de l'api sur sur : http//localhost:${port}`))

module.exports = app;