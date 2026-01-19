import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { PagerDto } from '~/common/dto/pager.dto';

// 创建用户的 DTO（数据传输对象）
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional() // 它可以是可选的
  @IsString()
  email?: string;

  @IsOptional() // 它可以是可选的
  @IsString()
  phone?: string;
}

// 更新用户的 DTO，继承自 CreateUserDto，并将所有属性设为可选
export class UpdateUserDto extends PartialType(CreateUserDto) {}

// 查询用户的 DTO，继承自 PagerDto，并指定泛型为 CreateUserDto
export class QueryUserDto extends PagerDto<CreateUserDto> {
}