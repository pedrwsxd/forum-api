import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { plainToInstance } from 'class-transformer';

import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionPublicDto } from './dto/public-question.dto';


@Injectable()
export class QuestionsService {
  constructor(private readonly prisma: PrismaService) {}

  /* ------------------------------------------------------------------ */
  /*  CREATE — autor é o usuário autenticado (id = userId)               */
  /* ------------------------------------------------------------------ */
  async create(
    dto: CreateQuestionDto,
    userId: number, // controller envia req.user.sub
  ): Promise<QuestionPublicDto> {
    const question = await this.prisma.question.create({
      data: {
        title: dto.title,
        content: dto.content,
        userId,
      },
      include: { user: true }, // pega autor
    });

    return plainToInstance(QuestionPublicDto, question, {
      excludeExtraneousValues: true,
    });
  }

  /* ------------------------------------------------------------------ */
  /*  LISTAR TODAS AS PERGUNTAS (pode paginar depois)                    */
  /* ------------------------------------------------------------------ */
  async findAll(): Promise<QuestionPublicDto[]> {
    const questions = await this.prisma.question.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: true,
        answers: {
          include: { user: true },
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    return plainToInstance(QuestionPublicDto, questions, {
      excludeExtraneousValues: true,
    });
  }

  /* ------------------------------------------------------------------ */
  /*  DETALHE DA PERGUNTA + RESPOSTAS                                    */
  /* ------------------------------------------------------------------ */
  async findOne(id: number): Promise<QuestionPublicDto> {
    const question = await this.prisma.question.findUnique({
      where: { id },
      include: {
        user: true,
        answers: {
          include: { user: true },
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    return plainToInstance(QuestionPublicDto, question, {
      excludeExtraneousValues: true,
    });
  }

  /* ------------------------------------------------------------------ */
  /*  UPDATE / DELETE — mantém a lógica original                         */
  /* ------------------------------------------------------------------ */
  async update(id: number, dto: UpdateQuestionDto) {
    return this.prisma.question.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    return this.prisma.question.delete({ where: { id } });
  }
}
