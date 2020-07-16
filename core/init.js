const requireDirectory = require('require-directory')
const Router = require('koa-router')

function Init(app) {
  if (!app) return

  registerGlobal()
  initRouter(app)
}

function initRouter(app) {
  const apiDirectory = `${process.cwd()}/app/api`

  requireDirectory(module, apiDirectory, {
    visit: obj => {
      if (obj instanceof Router) {
        app.use(obj.routes())
      }
    }
  })
}

// 注册全局变量
function registerGlobal() {
  global.environment = 'dev'
}

module.exports = Init
