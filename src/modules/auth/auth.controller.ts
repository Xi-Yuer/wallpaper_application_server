import { Controller, Post, Body } from '@nestjs/common'
import { AuthService } from './auth.service'
import { Registry } from './dto/resisty-dto'

@Controller('auth')
export class AuthController {
  // 直接导入 userModule 下导出的 userService 服务
  constructor(private readonly authService: AuthService) {}

  // 用户注册
  @Post('registry')
  registry(@Body() registy: Registry) {
    return this.authService.registry(registy)
  }

  // 用户登录
  @Post('login')
  login(@Body() registry: Registry) {
    return this.authService.login(registry)
  }
}
