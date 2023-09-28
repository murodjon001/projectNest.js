import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { TotalBalance } from './dto/total-income.dto';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async totalIncome(dto: TotalBalance) {
    const expense = await this.prisma.totalBalance.findMany({});

    const userId = expense[0].userId;

    try {
      const income_amount = await this.prisma.totalBalance.create({
        data: {
          income: dto.income,
          expense: dto.expense,
          balance: dto.income,
          userId: userId,
        },
      });

      return { income_amount };
    } catch (e) {
      throw new ConflictException(e);
    }
  }

  async findAll() {
    const foo = await this.prisma.category.findMany({});

    return foo;
  }

  async findAs() {
    return 'Salom';
  }
}
