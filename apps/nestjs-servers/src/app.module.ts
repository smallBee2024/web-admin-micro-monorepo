/**
 * 文件功能：根模块，汇总控制器与提供者
 */
import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './modules/users/users.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
// import { DevtoolsModule } from '@nestjs/devtools-integration';
import { FileOperationModule } from './modules/file-operation/file-operation.module';
import config from './config';


console.log('config11111', Object.values(config));


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      // 指定多个 env 文件时，第一个优先级最高
      envFilePath: ['.env.local', `.env.${process.env.NODE_ENV}`, '.env'],
      load: [...Object.values(config)],
    }),
    // 配置 Devtools 集成
    // DevtoolsModule.register({
    //   port: 4200,
    // }),
    UsersModule,
    FileOperationModule
  ],
  controllers: [],
  providers: [],
})
// export class AppModule {}
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('users');
  }
}


