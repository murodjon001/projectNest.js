import { Body, ConflictException, Controller, Get, Post, Request, UseGuards, } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { AuthGuard } from '../user/auth/auth.guard';
import { TotalBalance } from './dto/total-income.dto';

// @UseGuards(AuthGuard)
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly totalIncomeService: DashboardService,) {}
  @Post()
  totalIncome(@Body() dto: TotalBalance){
    try{
   
      const result = this.totalIncomeService.totalIncome(dto)
      return result

  }catch(e) {
    throw new ConflictException(e)
  }

  }

  @Get('get')
  findAll (){
    return this.totalIncomeService.findAll()
  }
}
