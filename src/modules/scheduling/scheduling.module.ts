import { Module } from '@nestjs/common';
import { SendReport } from './scheduling.service';
import { ScheduleController } from './scheduling.controller';
import { PrismaModule } from 'src/database/prisma/prisma.modul';
import { ScheduleModule } from '@nestjs/schedule';
// import { AddLogUser } from './scheduling.service';

@Module({
  imports: [PrismaModule, ScheduleModule.forRoot()],
  controllers: [],
  providers: [SendReport]
})
export class ScheduleModules {}
