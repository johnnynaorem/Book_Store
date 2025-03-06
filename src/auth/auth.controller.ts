import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dtos/SignInDto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(200)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.SignIn(signInDto.username, signInDto.email);
  }
}
