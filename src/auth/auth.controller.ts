import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Prisma } from '@prisma/client';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('signin')
    @HttpCode(HttpStatus.OK)
    async signin(@Body() params: Prisma.UserCreateInput) {
        return this.authService.signin(params);
    }
}
