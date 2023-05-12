import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common'
import { HttpException } from '@nestjs/common'
import { Response } from 'express'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const status = exception.getStatus()
    const message = exception.message
    // if (exception.response.message) {
    //   message = exception.response.message.join('')
    // }
    response.status(status).json({
      statusCode: status,
      message: message,
      url: ctx.getRequest().url,
      timestamp: new Date().toISOString(),
    })
  }
}
