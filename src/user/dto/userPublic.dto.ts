import { Exclude, Expose } from 'class-transformer';

@Exclude()                 
export class UserPublicDto {
  @Expose() id: number;        
  @Expose() name: string;
}
