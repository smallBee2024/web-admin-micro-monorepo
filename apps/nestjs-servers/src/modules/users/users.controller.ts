import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  HttpException,
  HttpStatus,
  ParseIntPipe,
  Query
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto, QueryUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { ConfigService } from '@nestjs/config';
// import config from '../../config';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    // @Inject('AA') private readonly aa: any,
    // @Inject('DB_CONFIG') private readonly dbConfig: any,
    // @Inject('ASYNC_CONNECTION') private readonly connection: any,
  ) {
    // 在构造函数中可以看到工厂提供者创建的实例
    // console.log('数据库配置:', this.dbConfig);
    // console.log('异步连接:', this.connection);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(@Query() query: QueryUserDto) {
    console.log('query', query);
    return this.usersService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const result = await this.usersService.update(+id, updateUserDto);

    if (!result) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    } else {
      return result;
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const result = this.usersService.remove(+id);

    if (!result) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    } else {
      return result;
    }
  }


  // @Get('config')
  // getConfig() {
  //   // 返回工厂提供者创建的配置信息
  //   return {
  //     valueProvider: this.aa,
  //     factoryProvider: this.dbConfig,
  //     asyncFactoryProvider: this.connection,
  //   };
  // }
}
