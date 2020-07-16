require('module-alias/register')

const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const static = require('koa-static')
const validate = require('koa-validate')
const logger = require('koa-logger')
const cache = require('koa-redis-cache')

const Init = require('@core/init')
const catchError = require('./middleware/exception')

const app = new Koa()
validate(app)

app.use(catchError)  // 注册全局错误处理
app.use(logger())
app.use(bodyParser())
app.use(static(`${__dirname}/static`))
app.use(cache({
  expire: 60,
  routes: ['/v1/spider']
}))

Init(app)  // 初始化操作

app.listen(3000, () => console.log(`Run in http://localhost:3000`))
