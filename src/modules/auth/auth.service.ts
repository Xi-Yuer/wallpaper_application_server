import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { plainToInstance } from 'class-transformer';
import { JWT_Config } from 'src/config/db.config';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { Registry } from './dto/resisty-dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwt: JwtService,
  ) {}
  // 用户注册
  registry(registry: Registry) {
    return this.userService.create(registry);
  }

  // TODO: 用户权限颁发 token, 账号密码校验
  async login(registry: Registry) {
    const { username, password } = registry;
    const userResult = await this.userService.findOneByUserNameAndShowPassword(
      username,
    );
    const passwordIsCorrect = await argon2.verify(
      userResult.password,
      password,
    );
    if (!userResult || !passwordIsCorrect) {
      throw new NotFoundException('用户名或密码错误');
    }

    // 用户名和密码验证通过
    const {
      id,
      username: name,
      avatar,
      role,
    } = plainToInstance(User, userResult);
    const token = this.jwt.sign(
      { id, name, role },
      {
        secret: JWT_Config.secret,
        expiresIn: JWT_Config.expireIn,
      },
    );
    return { id, name, role, avatar, token };
  }
}
