import { Question } from 'src/questions/entities/question.entity';
import { Answer } from 'src/answer/entities/answer.entity';
import { User as PrismaUser } from '@prisma/client';

export class User implements PrismaUser {
  id: number;
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  questions?: Question[];
  answers?: Answer[];
}