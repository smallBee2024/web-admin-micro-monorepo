import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

@Catch()
export class AnyExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    
    // 获取异常响应信息
    let errorResponse: any = {};
    if (exception instanceof HttpException) {
      const response = exception.getResponse();
      console.log('response', response);

      // 如果响应已经是对象，直接使用；否则包装
      if (typeof response === 'object' && response !== null) {
        // 在这里直接捕获到dto的错误信息，例如 创建用户接口的错误信息
        /**
          response = {
            statusCode: 400,
            message: 'Validation failed',
            errors: [
              {
                property: 'name',
                constraints: { isNotEmpty: 'name is required' },
              },
            ],
          }
         */
        errorResponse = response;
      } else {
        errorResponse = {
          statusCode: exception.getStatus(),
          message: response,
        };
      }
    } else {
      errorResponse = {
        statusCode: status,
        message: 'Internal server error',
      };
    }
    
    // 添加额外的信息
    errorResponse = {
      ...errorResponse,
      timestamp: new Date().toISOString(),
      path: request.url,
    };
    
    response.status(status).send(errorResponse);
  }
}