const { HttpException } = require('@core/httpException')

module.exports = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    const isHttpException = error instanceof HttpException

    if (environment === 'dev' && !isHttpException) {
      throw error
    }

    if (isHttpException) {
      const { errorCode, stateCode, msg } = error

      ctx.body = {
        errorCode,
        msg,
        request: `${ctx.method} ${ctx.path}`
      }
      ctx.status = stateCode
    } else {
      ctx.body = {
        errorCode: 999,
        msg: '出现了一个未知错误 O(∩_∩)O~~',
        request: `${ctx.method} ${ctx.path}`
      }
      ctx.status = 500
    }
  }
}
