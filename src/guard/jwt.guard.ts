import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { JWT_Config } from 'src/config/db.config'

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest()
    const token = request.headers.authorization
    if (token) {
      try {
        const decoded = this.jwtService.verify(token, {
          secret: JWT_Config.secret,
        })
        request.user = decoded
        return true
      } catch (err) {
        throw new UnauthorizedException('身份已过期，请先登录')
      }
    }
    throw new UnauthorizedException('暂无权限')
  }
}
