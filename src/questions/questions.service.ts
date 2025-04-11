import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class QuestionsService {

  constructor(
    private prismaService: PrismaService,
  ) { }

  async create(createQuestionDto: CreateQuestionDto, userId: number) {
    
    return await this.prismaService.question.create({
      data: { ...createQuestionDto, userId },
    })
  };

  async findAll() {
    return await this.prismaService.question.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.question.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return await this.prismaService.question.update({
      where: { id },
      data: updateQuestionDto,
    });
  }

  async remove(id: number) {
  
    return await this.prismaService.question.delete({
      where: { id },
    });

  }
}
