import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { RoleEnum } from 'src/enum/role.enum';
import { User } from 'src/modules/users/entities/user.entity';

interface IRequest extends Request {
  user: User;
  params: any;
}

export class isAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request: IRequest = context.switchToHttp().getRequest();
    const {
      user,
      params: { id },
    } = request;

    // 没有 token 并且没有
    if (!user || !id) {
      throw new UnauthorizedException('暂无权限');
    }

    const role = user.role.map((i) => i.id) || [];
    if (role.includes(RoleEnum.Aadmin) || user.id == id) {
      return true;
    }
    throw new UnauthorizedException('暂无权限');
  }
}
