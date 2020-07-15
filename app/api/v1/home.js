const Router = require('koa-router')

const router = new Router({
  prefix: '/v1'
})
const { Index } = require('@model')
const { ParameterException } = require('@core/httpException')
const Auth = require('@middleware/auth')
const { User } = require('@model/user')

router.get('/', new Auth().authentication(), async (ctx) => {
  const data = await User.findOne({
    where: {
      id: ctx.auth.id
    }
  })

  ctx.body = {
    errCode: 0,
    msg: '',
    data
  }
})

router.get('/destory', async (ctx) => {
  const index = ctx.checkQuery('index').notEmpty()

  if (ctx.errors) {
    throw new ParameterException('index必传')
  }

  const idx = await Index.findOne({
    where: {
      index: index.value
    }
  })
  // console.log(JSON.stringify(data))
  if (!idx) {
    throw new ParameterException('不存在', 404)
  }
  const data = await idx.destroy()
  // const data = await idx.restore()

  ctx.body = {
    errCode: 0,
    msg: '',
    data
  }
})

router.post('/', async (ctx) => {
  const { value: index } = ctx.checkBody('index').isInt('index不合法')
  const { value: artId } = ctx.checkBody('artId').isInt('artId不合法')
  const { value: type } = ctx.checkBody('type').isInt('type不合法')

  if (ctx.errors) {
    const errors = Object.values(ctx.errors[0])[0]
    throw new ParameterException(errors)
  }

  const data = await Index.create({ index, artId, type })
  ctx.body = {
    errCode: 0,
    msg: '',
    data
  }
})

module.exports = router
