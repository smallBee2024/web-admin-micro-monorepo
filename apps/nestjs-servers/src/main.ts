/**
 * 文件功能：应用入口，启动 NestJS HTTP 服务
 * 说明：从环境变量 PORT 读取端口，默认 3000
 */
import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const port = Number(process.env.PORT || 3003);
  await app.listen(port);
  // 简单启动日志
  // eslint-disable-next-line no-console
  console.log(`Nest server listening on http://localhost:${port}`);
}

bootstrap();


