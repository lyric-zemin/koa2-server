// 错误异常类
class HttpException extends Error {
  constructor(msg = '服务器异常', errorCode = 10000, stateCode = 400) {
    super()
    this.errorCode = errorCode
    this.stateCode = stateCode
    this.msg = msg
  }
}

class ParameterException extends HttpException {
  constructor(msg = '参数错误', errorCode = 10000) {
    super()
    this.errorCode = errorCode
    this.stateCode = 400
    this.msg = msg
  }
}

class UnauthorizedException extends HttpException {
  constructor(msg = '未经授权', errorCode = 4001) {
    super()
    this.errorCode = errorCode
    this.stateCode = 401
    this.msg = msg
  }
}

class ForbiddenException extends HttpException {
  constructor(msg = '无效Token', errorCode = 4003) {
    super()
    this.errorCode = errorCode
    this.stateCode = 403
    this.msg = msg
  }
}

module.exports = {
  HttpException,
  ParameterException,
  UnauthorizedException,
  ForbiddenException
}
