import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { compare } from 'bcryptjs';

import { UsersService } from '@/modules/users/users.service';
import { User } from '@/modules/users/entities';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<Omit<User, 'password'>> {
    const user = await this.usersService.findOne({ email });

    if (user && (await compare(password, user.password))) {
      const { password: _, ...userWithoutPassword } = user;

      return userWithoutPassword;
    }

    return null;
  }

  login(user: Express.User) {
    const payload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
