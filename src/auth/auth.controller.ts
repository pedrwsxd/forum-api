import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Res,
  } from '@nestjs/common';
  import { Response } from 'express';
  import { AuthService } from './auth.service';
  import { LoginDto } from './dto/login.dto';
  
  @Controller('auth')
  export class AuthController {
    constructor(private readonly auth: AuthService) {}
  
    @Post('signin')
    @HttpCode(HttpStatus.OK)
    async signin(
      @Body() loginDto: LoginDto,
      @Res({ passthrough: true }) res: Response,
    ) {
      const { user, access_token } = await this.auth.signin(loginDto);
  
      res.cookie('token', access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // em localhost deixe false
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60, 
      });
  
      return { user }; 
    }
  
    @Post('signout')
    @HttpCode(HttpStatus.OK)
    signout(@Res({ passthrough: true }) res: Response) {
      res.clearCookie('token');
      return { message: 'signed out' };
    }
  }