import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { PrismaModule } from './database/prisma/prisma.modul';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { ScheduleModules } from './modules/scheduling/scheduling.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UserEventModule } from './modules/user/events/events.module';

@Module({
  imports: [
    UserModule, 
    PrismaModule, 
    DashboardModule, 
    ScheduleModules,
    EventEmitterModule.forRoot(),
    UserEventModule 
  ]
})
export class AppModule {}
