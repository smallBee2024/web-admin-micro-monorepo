/**
 * 文件功能：示例服务，封装业务逻辑
 */
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello from NestJS!';
  }
}


