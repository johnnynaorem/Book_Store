import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/services/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userSerive: UserService,
    private jwtService: JwtService,
  ) {}
  async SignIn(
    username: string,
    email: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userSerive.findOne(email);
    if (user?.email !== email || user.username !== username) {
      throw new UnauthorizedException();
    }
    const payload = {
      sub: user.id,
      username: user.username,
      email: user.email,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
