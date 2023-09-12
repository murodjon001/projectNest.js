import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { Test } from './dashboard.service';
import { AuthModule } from '../user/auth/auth.module';

@Module({
    imports: [AuthModule],
    controllers:[DashboardController],
    providers:[Test],
    exports: [Test]
})
export class DashboardModule {}
