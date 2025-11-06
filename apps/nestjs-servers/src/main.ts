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
import { HttpException, ValidationPipe } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { AnyExceptionFilter } from './common/filters/any-exception.filter';


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


const fastifyAdapter = new FastifyAdapter({
  trustProxy: true,
  logger: false,
});

// 启动函数
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyAdapter
  );
  
  /**
   * 全局中间件
   * 可以做一些：全局路由白名单，token鉴权
   */
  app.use(loggerMiddleware());
  // 全局异常过滤器
  app.useGlobalFilters(new AnyExceptionFilter());
  // 全局响应拦截器
  app.useGlobalInterceptors(new ResponseInterceptor());
  // 全局验证管道
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // 自动删除非白名单属性
    forbidNonWhitelisted: false, // 如果设置为 true, 非白名单属性将导致请求失败
    transform: true, // 自动将普通对象转换为 DTO 实例
    transformOptions: {
      enableImplicitConversion: true, // 允许隐式类型转换
    },
    // 详细的错误响应
    exceptionFactory: (errors) => {
      const messages = errors.map(error => ({
        property: error.property,
        constraints: error.constraints,
      }));
      return new HttpException(
        {
          statusCode: 400,
          message: 'Validation failed',
          errors: messages,
        },
        400,
      );
    },
  }));


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


