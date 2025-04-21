import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwt: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies.authToken;
    try {
      if (!token)
        throw new HttpException("Oldin logindan o'tishingiz shart", 404);
      const decoded = await this.jwt.verifyAsync(token);
      request.user = decoded;
      return true;
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}
