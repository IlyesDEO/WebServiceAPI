 module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Exo', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      nbSeries: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      nbRep: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    })
  }