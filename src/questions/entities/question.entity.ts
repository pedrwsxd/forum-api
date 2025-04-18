import { Answer } from 'src/answer/entities/answer.entity';
import { User } from 'src/user/entities/user.entity';

export class Question {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  user: User; 
  answers: Answer[]; 
}