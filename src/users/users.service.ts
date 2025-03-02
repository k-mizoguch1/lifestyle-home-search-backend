import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOneByID(id: number): Promise<User | null> {
    if (!id) {
      return null;
    }
    return await this.usersRepository.findOneBy({ id });
  }

  async findOneByName(name: string): Promise<User | null> {
    return await this.usersRepository.findOneBy({ name });
  }

  async create(user: Partial<User>): Promise<User> {
    return await this.usersRepository.save(user);
  }
}
