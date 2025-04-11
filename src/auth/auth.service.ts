import { Injectable, NotFoundException, Param, UnauthorizedException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(private userService: UserService ) {}

    async signin(params: Prisma.UserCreateInput): Promise<Omit<User, 'password'>> {
        const user = await this.userService.user({email: params.email});
        if (!user) {
            throw new NotFoundException('User not found');
        }
        const passwordMatch = await bcrypt.compare(params.password, user.password);
        if (!passwordMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const { password, ...result } = user;

        return result;
    }
}

