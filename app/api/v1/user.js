const Router = require('koa-router')

const router = new Router({
  prefix: '/v1/user'
})
const { User } = require('@model/user')
const { userValidate } = require('@core/validate')
const Auth = require('@middleware/auth')
const { ParameterException, UnauthorizedException } = require('@core/httpException')

router.post('/register', async (ctx) => {
  const info = await userValidate(ctx)
  const data = await User.create(info)

  ctx.body = {
    errCode: 0,
    msg: '',
    data
  }
})

router.post('/update', new Auth().authentication(), async (ctx) => {
  const nickname = ctx.checkBody('nickname').notEmpty('昵称不可为空').len(2, 16, '昵称不合法').trim()

  if (ctx.errors) {
    const errors = Object.values(ctx.errors[0])[0]
    throw new ParameterException(errors)
  }

  const user = await User.findOne({
    where: {
      id: ctx.auth.id
    }
  })
  if (!user) {
    throw new UnauthorizedException('用户不存在')
  }

  user.nickname = nickname.value
  const data = await user.save()

  ctx.body = {
    errCode: 0,
    msg: '',
    data
  }
})

module.exports = router
