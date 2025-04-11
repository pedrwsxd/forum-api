import { UserService } from './user.service';
import { Prisma, User as UserModel } from '@prisma/client';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) { }

    @Post('')
    async signupUser(
        @Body(new ValidationPipe()) userData: CreateUserDto,
    ): Promise<UserModel> {
        return this.userService.createUser(userData);
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    async getUser(@Param('id', ParseIntPipe) id: number): Promise<Omit<UserModel, 'password'> | null> { 
        return this.userService.user({ id }) ?? null;
    }

    @UseGuards(AuthGuard)
    @Patch(':id')
    async updateUser(
        @Param('id', ParseIntPipe) id: number,
        @Body(new ValidationPipe()) userData: UpdateUserDto,
    ): Promise<UserModel> {
        return this.userService.updateUser({
            where: { id },
            data: userData,
        });
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<UserModel> {
        return this.userService.deleteUser({ id });
    }

}
