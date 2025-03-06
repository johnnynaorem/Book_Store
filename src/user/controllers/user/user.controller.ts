import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SignInDto } from 'src/auth/dtos/SignInDto';
import { CreateUserDto } from 'src/user/dtos/create-user';
import { UserService } from 'src/user/services/user/user.service';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create-user')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get('/get-users')
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findById(+id);
  }

  @Get('/get-user')
  findByEmail(@Body() signInDto: SignInDto) {
    return this.userService.findOne(signInDto.email);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: CreateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
