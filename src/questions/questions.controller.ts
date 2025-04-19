import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  ParseIntPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';

import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { QuestionPublicDto } from './dto/public-question.dto';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

 
  @UseGuards(AuthGuard)
  @Post()
  create(
    @Body() dto: CreateQuestionDto,
    @Request() req: any,                // AuthGuard popula req.user
  ): Promise<QuestionPublicDto> {
    return this.questionsService.create(dto, req.user.sub);
  }

  @Get()
  findAll(): Promise<QuestionPublicDto[]> {
    return this.questionsService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<QuestionPublicDto> {
    return this.questionsService.findOne(id);
  }

 
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateQuestionDto,
  ) {
    return this.questionsService.update(id, dto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.questionsService.remove(id);
  }
}
