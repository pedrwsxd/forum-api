import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    /* 1. Tenta pegar token do cookie */
    let token: string | undefined = (req.cookies as any)?.token;

    /* 2. Se não houver cookie, tenta cabeçalho Authorization */
    if (!token) token = this.extractBearerToken(req);

    if (!token) throw new UnauthorizedException('Token is required');

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET || process.env.SECRET_KEY || '',
      });

      /* 3. Deixa o payload disponível para os controllers/services */
      req.user = payload; // { sub, email, iat, exp, ... }
      return true;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private extractBearerToken(request: Request): string | undefined {
    const auth = (request.headers as any).authorization;
    if (!auth) return undefined;
    const [type, token] = auth.split(' ');
    return type === 'Bearer' ? token : undefined;
  }
}
