/**
 * 文件功能：应用入口，启动 NestJS HTTP 服务
 * 说明：从环境变量 PORT 读取端口，默认 3000
 */
import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { VersioningType } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { FastifyRequest, FastifyReply } from 'fastify';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

/**
 * 全局中间件
 * 可以做一些：全局路由白名单，token鉴权
 */
const loggerMiddleware = () => {
  return (req: FastifyRequest['raw'], res: FastifyReply['raw'], next: () => void) => {
    console.log('全局 loggerMiddleware');
    res.on('finish', () => {
      console.log('全局 loggerMiddleware finish');
    });
    next();
  };
};


// 启动函数
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  /**
   * 全局中间件
   * 可以做一些：全局路由白名单，token鉴权
   */
  app.use(loggerMiddleware());
  // 全局响应拦截器
  app.useGlobalInterceptors(new ResponseInterceptor());


  const port = Number(process.env.PORT || 3003);
  // 版本控制
  // app.enableVersioning({
  //   type: VersioningType.URI,
  //   defaultVersion: '1',
  //   prefix: 'v',
  // });
  await app.listen(port);
  // 简单启动日志
  // eslint-disable-next-line no-console
  console.log(`Nest server listening on http://localhost:${port}`);
}
 
bootstrap();


