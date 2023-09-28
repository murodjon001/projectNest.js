import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { PrismaModule } from './database/prisma/prisma.modul';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { ScheduleModules } from './modules/scheduling/scheduling.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UserEventModule } from './modules/user/events/events.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [
    UserModule, 
    PrismaModule, 
    DashboardModule, 
    ScheduleModules,
    EventEmitterModule.forRoot(),
    UserEventModule 
  ],
  providers:[AppService],
  controllers:[AppController]
})
export class AppModule {}
