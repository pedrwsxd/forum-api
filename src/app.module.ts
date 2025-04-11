import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { QuestionsModule } from './questions/questions.module';
import { AnswerModule } from './answer/answer.module';

@Module({
  imports: [AuthModule, UserModule, DatabaseModule, QuestionsModule, AnswerModule],
})
export class AppModule {}
