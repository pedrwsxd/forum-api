import { Exclude, Expose, Type } from 'class-transformer';
import { AnswerPublicDto } from 'src/answer/dto/answer.public.dto';
import { UserPublicDto } from 'src/user/dto/userPublic.dto';

@Exclude()
export class QuestionPublicDto {
  @Expose() id: number;
  @Expose() title: string;
  @Expose() content: string;
  @Expose() createdAt: Date;

  @Expose() @Type(() => UserPublicDto)
  user: UserPublicDto;

  @Expose() @Type(() => AnswerPublicDto)
  answers?: AnswerPublicDto[];
}