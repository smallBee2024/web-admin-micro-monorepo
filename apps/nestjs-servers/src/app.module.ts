/**
 * 文件功能：根模块，汇总控制器与提供者
 */
import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
// import { DevtoolsModule } from '@nestjs/devtools-integration';

@Module({
  imports: [
    // 配置 Devtools 集成
    // DevtoolsModule.register({
    //   port: 4200,
    // }),
    UsersModule
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


