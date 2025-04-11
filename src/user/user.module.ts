import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  exports: [UserService],
  imports: [DatabaseModule,  forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
