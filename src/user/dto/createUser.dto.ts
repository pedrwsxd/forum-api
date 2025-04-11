import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {

    @IsEmail({}, { message: 'Formato de e-mail inválido' })
    email: string;
  
    @IsString({ message: 'O nome deve ser uma string' })
    @IsNotEmpty({ message: 'O nome é obrigatório' })
    @MinLength(3, { message: 'O nome deve ter pelo menos 3 caracteres' })
    name: string;
  
    @IsNotEmpty({ message: 'A senha é obrigatória' })
    @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
    password: string;
  }