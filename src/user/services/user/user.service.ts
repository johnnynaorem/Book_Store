import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/user.entity';
import { CreateUserDto } from 'src/user/dtos/create-user';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async createUser(createuserDto: CreateUserDto) {
    try {
      const newUser = this.userRepo.create(createuserDto);
      return await this.userRepo.save(newUser);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Email Already Exist');
      }
    }
  }

  findAll() {
    return this.userRepo.find({ relations: ['books'] });
  }

  findById(userId: number) {
    return this.userRepo.findOne({
      where: { id: userId },
      relations: ['books'],
    });
  }

  findOne(email: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { email: email } });
  }

  update(userId: number, updateUser: CreateUserDto) {
    const user = this.userRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('user not found....');
    }
    this.userRepo.update({ id: userId }, { ...updateUser });
  }

  async remove(id: number) {
    const user = await this.userRepo.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException('User not Found');
    }
    await this.userRepo.remove(user);
  }
}
