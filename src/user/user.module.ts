import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  exports: [UserService],
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
