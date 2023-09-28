import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { AuthModule } from '../user/auth/auth.module';
import { PrismaModule } from 'src/database/prisma/prisma.modul';

@Module({
    imports: [AuthModule, PrismaModule],
    controllers:[DashboardController],
    providers:[DashboardService],
    exports: [DashboardService]
})
export class DashboardModule {}
