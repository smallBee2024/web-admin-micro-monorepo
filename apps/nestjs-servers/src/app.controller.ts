/**
 * 文件功能：示例控制器，提供基础路由
 * 复杂逻辑说明：无复杂逻辑
 */
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  health(): { code: number, data: any[], message: string } {
    return {
      code: 200,
      data: [
        {
          name: 'John',
          age: 20
        },
        {
          name: 'Jane',
          age: 21
        }
      ],
      message: 'success'
    };
  }
}


