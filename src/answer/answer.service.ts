import { Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AnswerService {

  constructor(
    private prismaService: PrismaService,
  ) { }

  async create(createAnswerDto: CreateAnswerDto, user: {sub: number}, questionId: number) {
    return await this.prismaService.answer.create({
      data: {
        ...createAnswerDto,
        userId: user.sub,
        questionId,
      },
    });
   }

  async findAll() {
    return await this.prismaService.answer.findMany();
  }

  async findOne(id: number) {
   return await this.prismaService.answer.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateAnswerDto: UpdateAnswerDto) {
    return await this.prismaService.answer.update({
      where: { id },
      data: updateAnswerDto,
    });
  }

  async remove(id: number) {
    return await this.prismaService.answer.delete({
      where: { id },
    });
  }
 }