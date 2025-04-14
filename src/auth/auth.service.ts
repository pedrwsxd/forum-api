import { Injectable, NotFoundException, Param, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/prisma.service';
import { LoginDto } from './dto/login.dto';
import { plainToInstance } from 'class-transformer';
import { UserPublicDto } from 'src/user/dto/userPublic.dto';


@Injectable()
export class AuthService {

    constructor(private jwtService: JwtService, private prismaService: PrismaService ) {}

    async signin(dto: LoginDto): Promise<{ user: any; access_token: string }> {
       
      const user = await this.prismaService.user.findUnique({
          where: { email: dto.email },
        });
      
        if (!user) throw new NotFoundException('User not found');
      
        const ok = await bcrypt.compare(dto.password, user.password);
      
        if (!ok) throw new UnauthorizedException('Invalid credentials');
      
        const payload = { sub: user.id, email: user.email };
       
        const access_token = await this.jwtService.signAsync(payload);
      
        const { password, ...safeUser } = user; 
       
        const userDto = plainToInstance(UserPublicDto, user, {
          excludeExtraneousValues: true,
        });

        return { user: userDto, access_token }; 
      }
}

