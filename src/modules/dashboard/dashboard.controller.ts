import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Test } from './dashboard.service';
import { AuthGuard } from '../user/auth/auth.guard';


@UseGuards(AuthGuard)
@Controller('dashboard')
export class DashboardController {
  constructor(private testService: Test) {}
  @Get('')
  getTest(): string {
    
    return this.testService.gethello();
  }
}
