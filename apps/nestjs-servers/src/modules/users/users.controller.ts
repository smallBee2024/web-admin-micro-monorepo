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
  ParseIntPipe
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ConfigService } from '@nestjs/config';
// import config from '../../config';


@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    @Inject('AA') private readonly aa: any,
    @Inject('DB_CONFIG') private readonly dbConfig: any,
    @Inject('ASYNC_CONNECTION') private readonly connection: any,
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
  findAll() {
    console.log(this.configService.get('database.host'));
    console.log(this.configService.get('database.port'));
    // console.log('config11111222', config);
    console.log('findAll users', process.env.DB_HOST);
    // console.log(typeof this.usersService)
    // console.log(this.aa)
    // console.log(this.dbConfig)
    // console.log(this.connection)
    return this.usersService.findAll();
  }

  @Get('config')
  getConfig() {
    // 返回工厂提供者创建的配置信息
    return {
      valueProvider: this.aa,
      factoryProvider: this.dbConfig,
      asyncFactoryProvider: this.connection,
    };
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    console.log('findOne', id, typeof id);
    return this.usersService.findOne(+id);
    // throw new HttpException('This is a test error', HttpStatus.BAD_REQUEST);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
