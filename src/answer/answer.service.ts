/* ───────────────────  answer.service.ts  ─────────────────── */

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { plainToInstance } from 'class-transformer';

import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { AnswerPublicDto } from './dto/answer.public.dto';


@Injectable()
export class AnswerService {
  constructor(private readonly prisma: PrismaService) {}

  /* CREATE ─────────────────────────────────────────────────── */
  async create(
    questionId: number,
    dto: CreateAnswerDto,
    userId: number,
  ): Promise<AnswerPublicDto> {
    const answer = await this.prisma.answer.create({
      data: {
        content: dto.content,
        questionId,
        userId,
      },
      include: { user: true },
    });

    return plainToInstance(AnswerPublicDto, answer, {
      excludeExtraneousValues: true,
    });
  }

  /* LISTAR ─ (opcional) mostrar todas ou filtrar por questão */
  async findAll(questionId?: number) {
    return this.prisma.answer.findMany({
      where: questionId ? { questionId } : undefined,
      include: { user: true },
      orderBy: { createdAt: 'asc' },
    });
  }

  /* DETALHE ───────────────────────────────────────────────── */
  async findOne(id: number) {
    return this.prisma.answer.findUnique({
      where: { id },
      include: { user: true },
    });
  }

  /* UPDATE / DELETE ───────────────────────────────────────── */
  async update(id: number, dto: UpdateAnswerDto) {
    return this.prisma.answer.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    return this.prisma.answer.delete({ where: { id } });
  }
}
