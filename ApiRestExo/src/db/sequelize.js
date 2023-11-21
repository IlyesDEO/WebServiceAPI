const { Sequelize, DataTypes } = require('sequelize')
const ExoModel = require('../models/exo.js')
const UserModel = require('../models/user.js')
const exo = require('./mock-exo')
const bcrypt = require('bcrypt')
  
const sequelize = new Sequelize('api-muscu', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb',
  dialectOptions: {
    timezone: 'Etc/GMT-2',
  },
  logging: false
})
  
const Exo = ExoModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)

  
const initDb = async () => {

  await sequelize.sync({force: true})
  for(let e of exo){
  await Exo.create({
      name: e.name,
      nbSeries: e.nbSeries,
      nbRep: e.nbRep,
    })
   }
  const hash = await bcrypt.hash('root', 10)
  User.create({username: 'ilyes',  password: hash})
   
}
  
module.exports = { 
  initDb, Exo, User
}