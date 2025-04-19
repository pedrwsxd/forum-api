import { Exclude, Expose, Type } from 'class-transformer';
import { UserPublicDto } from 'src/user/dto/userPublic.dto';

@Exclude()
export class AnswerPublicDto {
  @Expose() id: number;
  @Expose() content: string;
  @Expose() createdAt: Date;

  @Expose() @Type(() => UserPublicDto)
  user: UserPublicDto;
}