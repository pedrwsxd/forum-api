// src/user/dto/user-public.dto.ts
import { Exclude, Expose } from 'class-transformer';

@Exclude()                 
export class UserPublicDto {
  @Expose() id: number;        
  @Expose() email: string;
  @Expose() name: string;
}
