const { Model, DataTypes } = require('sequelize')
const bcrypt = require('bcryptjs')

const sequelize = require('@core/db')

class User extends Model {

}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nickname: DataTypes.STRING,
  email: {
    type: DataTypes.STRING(128),
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    set(val) {
      const salt = bcrypt.genSaltSync(10)
      const psw = bcrypt.hashSync(val, salt)
      this.setDataValue('password', psw)
    }
  },
  openid: {
    type: DataTypes.STRING(64),
    unique: true
  }
}, {
  sequelize,
  tableName: 'user'
})

module.exports = {
  User
}
