const Router = require('koa-router')
const jwt = require('jsonwebtoken')

const router = new Router({
  prefix: '/v1/token'
})
const { tokenValidate } = require('@core/validate')
const { security } = require('@config')
const { ParameterException } = require('@core/httpException')
const Auth = require('@middleware/auth')

router.post('/', async (ctx) => {
  const info = await tokenValidate(ctx)
  const token = jwt.sign({ id: info.id, level: 1 }, security.secretKey, { expiresIn: security.expiresIn })

  ctx.body = {
    errCode: 0,
    msg: '',
    data: token
  }
})

router.post('/verify', async (ctx) => {
  const token = ctx.checkBody('token').notEmpty('token不可为空')
  if (ctx.errors) {
    throw new ParameterException('token不可为空')
  }

  const data = Auth.verifyToken(token.value)

  ctx.body = {
    errCode: 0,
    msg: '',
    data
  }
})

module.exports = router
