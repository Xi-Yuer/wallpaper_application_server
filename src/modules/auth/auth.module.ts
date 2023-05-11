import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JWT_Config } from 'src/config/db.config';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: JWT_Config.secret,
      signOptions: {
        expiresIn: JWT_Config.expireIn,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
})
export class AuthModule {}
