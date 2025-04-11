import { UserService } from './user.service';
import { Prisma, User as UserModel } from '@prisma/client';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) { }

    @Post('')
    async signupUser(
        @Body() userData: Prisma.UserCreateInput,
    ): Promise<UserModel> {
        return this.userService.createUser(userData);
    }

    @Get(':id')
    async getUser(@Param('id') id: string): Promise<UserModel | null> {
        return this.userService.user({ id: Number(id) });
    }

    @Put(':id')
    async updateUser(
        @Param('id') id: string,
        @Body() userData: Prisma.UserUpdateInput,
    ): Promise<UserModel> {
        return this.userService.updateUser({
            where: { id: Number(id) },
            data: userData,
        });
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string): Promise<UserModel> {
        return this.userService.deleteUser({ id: Number(id) });
    }

}
