import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from 'src/database/prisma/prisma.modul';
import { AuthModule } from './auth/auth.module';



@Module({
  imports: [
    PrismaModule, 
    AuthModule,
  ],
  controllers: [
    UserController, 
    ],
  providers: [
    UserService,
  ],
})
export class UserModule {}
