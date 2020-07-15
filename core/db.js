const { Sequelize } = require('sequelize')
const { database: { dbName, host, port, user, password } } = require('@config')

const sequelize = new Sequelize(dbName, user, password, {
  host,
  port,
  dialect: 'mysql',
  logging: false,
  timezone: '+08:00',
  define: {
    freezeTableName: true  // 强制表名称与模型一致
  }
})

sequelize.sync()  // 如果表不存在，则创建该表(如果该表已经存在，则不执行任何操作)

module.exports = sequelize
