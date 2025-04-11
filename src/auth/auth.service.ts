import { Injectable, NotFoundException, Param, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AuthService {

    constructor(private jwtService: JwtService, private prismaService: PrismaService ) {}

    async signin(params: Prisma.UserCreateInput): Promise<{ access_token: string }> {
        const user = await this.prismaService.user.findUnique(
        {
            where: {email: params.email}
        }   
        );
        if (!user) {
            throw new NotFoundException('User not found');
        }
        const passwordMatch = await bcrypt.compare(params.password, user.password);
        if (!passwordMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }
        
        const payload = { sub: user.id };

        return { access_token: await this.jwtService.signAsync(payload) };
    }
}

