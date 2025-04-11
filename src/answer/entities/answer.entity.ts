import { Question } from 'src/questions/entities/question.entity';
import { User } from 'src/user/entities/user.entity';

export class Answer {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  questionId: number;
  userId: number;
  question: Question; 
  user: User; 
}