const jwt = require('jsonwebtoken')
const { ForbiddenException } = require('@core/httpException')
const { security } = require('@config')

class Auth {
  constructor(level = 1) {
    this.level = level
  }

  // get authentication() {
  //   return async (ctx, next) => {
  //     const token = ctx.header.authorization ? ctx.header.authorization.replace('Bearer ', '') : ''

  //     if (!token) {
  //       throw new ForbiddenException('未携带Token')
  //     }

  //     let decode = ''
  //     try {
  //       decode = jwt.verify(token, security.secretKey)
  //     } catch (error) {
  //       if (error.name == 'TokenExpiredError') {
  //         throw new ForbiddenException('token已过期')
  //       }
  //       throw new ForbiddenException()
  //     }

  //     if (decode.level < this.level) {
  //       throw new ForbiddenException('权限不足')
  //     }

  //     ctx.auth = decode

  //     await next()
  //   }
  // }

  // async authentication(ctx, next) {
  //   const token = ctx.header.authorization ? ctx.header.authorization.replace('Bearer ', '') : ''

  //   if (!token) {
  //     throw new ForbiddenException('未携带Token')
  //   }

  //   let decode = ''
  //   try {
  //     decode = jwt.verify(token, security.secretKey)
  //   } catch (error) {
  //     if (error.name == 'TokenExpiredError') {
  //       throw new ForbiddenException('token已过期')
  //     }
  //     throw new ForbiddenException()
  //   }

  //   if (decode.level < this.level) {
  //     throw new ForbiddenException('权限不足')
  //   }

  //   ctx.auth = decode

  //   await next()
  // }

  authentication() {
    return async (ctx, next) => {
      const token = ctx.header.authorization ? ctx.header.authorization.replace('Bearer ', '') : ''

      if (!token) {
        throw new ForbiddenException('未携带Token')
      }

      let decode = ''
      try {
        decode = jwt.verify(token, security.secretKey)
      } catch (error) {
        if (error.name == 'TokenExpiredError') {
          throw new ForbiddenException('token已过期')
        }
        throw new ForbiddenException()
      }

      if (decode.level < this.level) {
        throw new ForbiddenException('权限不足')
      }

      ctx.auth = decode

      await next()
    }
  }

  static verifyToken(token) {
    try {
      jwt.verify(token, security.secretKey)
      return true
    } catch (error) {
      return false
    }
  }
}

Auth.level = {
  USER: 8,
  ADMIN: 16,
  SUPER_ADMIN: 32
}

module.exports = Auth
