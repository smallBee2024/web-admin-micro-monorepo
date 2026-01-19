import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto, UpdateUserDto, QueryUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
 

  create(createUserDto: CreateUserDto) {
    // console.log('createUserDto', createUserDto);
    try {
      const u = this.userRepository.create(createUserDto);
      // console.log('new user entity', u);
      const saved = this.userRepository.save(u);
      return saved;
    } catch (error) {
      console.error('Error creating user entity:', error);
      throw error;
    }
  }

  findAll(query: QueryUserDto) {
    console.log('query', query);
    // return `This action returns all users`;
    return this.userRepository.find();
  }

  findOne(id: number) {
    // return `This action returns a #${id} user`;
    return this.userRepository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    // return `This action updates a #${id} user`;
    const result =  await this.userRepository.update(id, updateUserDto);

    console.log('update result', result);
    if (result.affected === 0) {
      return false;
    }
    
    return true;
  }

  async remove(id: number) {
    // return `This action removes a #${id} user`;
    console.log('remove user id', id);
    const result = await this.userRepository.delete(id);

    console.log('remove result', result);
    if (result.affected === 0) {
      return false;
    }
    return true;
  }
}
