/* ───────────────────  answer.controller.ts  ─────────────────── */

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ParseIntPipe,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Controller('questions/:questionId/answers')
@UseGuards(AuthGuard)                           // todas as rotas requerem login
export class AnswerController {
  constructor(private readonly service: AnswerService) {}

  /* CREATE ─────────────────────────────────────────────────── */
  @Post()
  create(
    @Param('questionId', ParseIntPipe) questionId: number,
    @Body() dto: CreateAnswerDto,
    @Request() req: any,                  // AuthGuard → req.user.sub
  ) {
    return this.service.create(questionId, dto, req.user.sub);
  }

  /* LISTAR TODAS AS RESPOSTAS (opcional) ───────────────────── */
  @Get()
  findAll(@Param('questionId', ParseIntPipe) questionId: number) {
    return this.service.findAll(questionId);
  }

  /* DETALHE DE UMA RESPOSTA ───────────────────────────────── */
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  /* UPDATE / DELETE ───────────────────────────────────────── */
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAnswerDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
