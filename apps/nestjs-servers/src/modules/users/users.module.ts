import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [
    // 一、普通提供者示例：直接使用值
    UsersService,
    // 二、常量提供者示例
    {
      provide: 'AA',
      useValue: {
        a: 1,
        b: 2,
      },
    },
    // 三、工厂提供者示例：动态创建数据库配置
    {
      provide: 'DB_CONFIG',
      useFactory: (usersService: UsersService) => {
        // 工厂函数可以执行异步操作、条件判断等
        const env = process.env.NODE_ENV || 'development';
        return {
          host: env === 'production' ? 'prod.db.com' : 'localhost',
          port: 5432,
          database: 'users_db',
          timestamp: new Date().toISOString(),
          // 可以使用注入的依赖
          serviceName: usersService.constructor.name,
        };
      },
      inject: [UsersService], // 声明依赖项
    },
    // 四、异步工厂提供者示例
    {
      provide: 'ASYNC_CONNECTION',
      useFactory: async () => {
        // 模拟异步操作，如数据库连接
        await new Promise(resolve => setTimeout(resolve, 8000));
        return {
          status: 'connected',
          connectionId: Math.random().toString(36).substring(7),
          connectedAt: new Date().toISOString(),
        };
      },
    },
  ],
  exports: [TypeOrmModule],
})
export class UsersModule {}
