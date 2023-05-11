import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { RoleEnum } from 'src/enum/role.enum';

export class IsAdmin implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: any = context.switchToHttp().getRequest();
    const { user } = request;

    // 没有 token 并且没有
    if (!user) {
      throw new UnauthorizedException('暂无权限');
    }

    const role = user.role.map((i) => i.id) || [];
    if (role.includes(RoleEnum.Aadmin)) {
      return true;
    }
    throw new UnauthorizedException('暂无权限');
  }
}
