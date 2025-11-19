import { Injectable, NestMiddleware } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: FastifyRequest, res: FastifyReply['raw'], next: () => void) {
    const startTime = Date.now();

    console.log('LoggerMiddleware， 进入中间件');
    // 记录请求信息
    // console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    // console.log('Headers:', req.headers.host);
    
    // 监听响应完成事件
    res.on('finish', (data: any) => {
      const duration = Date.now() - startTime;
      console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - ${res.statusCode} - ${duration}ms`);
      // console.log('LoggerMiddleware， 离开中间件', res);
      // 获取响应的数据
      // console.log('LoggerMiddleware， 响应数据', data);
    });

    next();
  }
}