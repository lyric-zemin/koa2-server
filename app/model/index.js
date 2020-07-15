const { Model, DataTypes } = require('sequelize')

const sequelize = require('@core/db')

class Index extends Model {
  
}

Index.init({
  index: DataTypes.INTEGER,
  artId: DataTypes.INTEGER,
  type: DataTypes.INTEGER
}, {
  sequelize,
  paranoid: true
})

module.exports = {
  Index
}
