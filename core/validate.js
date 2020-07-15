const bcrypt = require('bcryptjs')
const { User } = require('@model/user')
const { ParameterException, UnauthorizedException } = require('@core/httpException')

async function userValidate(ctx) {
  const nickname = ctx.checkBody('nickname').notEmpty('昵称不可为空').len(2, 16, '昵称不合法').trim()
  const password1 = ctx.checkBody('password1').notEmpty('密码不可为空').len(6, 32, '密码至少6个字符，最多32个字符')
  const password2 = ctx.checkBody('password2').eq(password1.value, '两次输入的密码必须相同')
  const email = ctx.checkBody('email').notEmpty('邮箱不可为空').isEmail('邮箱不符合规范')

  if (ctx.errors) {
    const errors = Object.values(ctx.errors[0])[0]
    throw new ParameterException(errors)
  }

  const user = await User.findOne({
    where: {
      email: email.value
    }
  })
  if (user) {
    throw new ParameterException('email已存在')
  }

  return {
    nickname: nickname.value,
    password: password1.value,
    email: email.value
  }
}

async function tokenValidate(ctx) {
  const email = ctx.checkBody('email').notEmpty('邮箱不可为空').isEmail('邮箱不符合规范')
  const password = ctx.checkBody('password').notEmpty('密码不可为空')

  if (ctx.errors) {
    const errors = Object.values(ctx.errors[0])[0]
    throw new ParameterException(errors)
  }

  const user = await User.findOne({
    where: {
      email: email.value
    }
  })
  if (!user) {
    throw new UnauthorizedException('该用户不存在')
  }
  if (!bcrypt.compareSync(password.value, user.password)) {
    throw new UnauthorizedException('密码不匹配')
  }

  return user
}

module.exports = {
  userValidate,
  tokenValidate
}
