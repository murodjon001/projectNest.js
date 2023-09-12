import { Cron } from '@nestjs/schedule';
import { PrismaService } from '../../database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { readFileSync, readFile } from 'fs';
import { log } from 'console';


@Injectable()
export class SendReport {
  constructor(private readonly prisma: PrismaService) {}
  @Cron('0 30 7 * * 1-5', {
    name: 'notifications',
    timeZone: 'Asia/Tashkent',
  })
  async sendReport() {
    const [income, expense, categoryIncome, categoryExpense, totalBalance] =
      await this.prisma.$transaction([
        this.prisma.$queryRaw` SELECT * 
      FROM "Transaction"
      WHERE "createdAt" >= NOW() - INTERVAL '24 HOURS' 
      AND "categoryId" IN (SELECT "id" FROM "Category" WHERE "operation" = 'income');`, //Ushbu SQL so'rov transaksyalarni categoriyasini tahlil qilib 24 soatlik intervaldagi income categoriyasiga teng tranzaksyalarni chiqarib beradi

        this.prisma.$queryRaw`SELECT * 
      FROM "Transaction"
      WHERE "createdAt" >= NOW() - INTERVAL '24 HOURS' 
      AND "categoryId" IN(SELECT "id" FROM "Category" WHERE "operation" = 'expense');`, //Ushbu SQL so'rov transaksyalarni categoriyasini tahlil qilib 24 soatlik intervaldagi expense categoriyasiga teng tranzaksyalarni chiqarib beradi

        this.prisma.$queryRaw`SELECT 
      c.name AS category_name,
      COUNT(t.id) AS transaction_count
  FROM
      "Category" c
  LEFT JOIN
      "Transaction" t ON c.id = t."categoryId"
  WHERE
      c.operation = 'income'  
  GROUP BY
      c.name
  ORDER BY
      transaction_count DESC, c.name;`, //Category.operation = income ga teng bo'lgan categoriyalar kamamayish tartibida saralanib chiqariladi

        this.prisma.$queryRaw`SELECT
      c.name AS category_name,
      COUNT(t.id) AS transaction_count
  FROM
      "Category" c
  LEFT JOIN
      "Transaction" t ON c.id = t."categoryId"
  WHERE
      c.operation = 'expense'  
  GROUP BY
      c.name
  ORDER BY
      transaction_count DESC, c.name;`, //Category.operation = expense ga teng bo'lgan categoriyalar kamamayish tartibida saralanib chiqariladi

        this.prisma
          .$queryRaw`SELECT "balance" FROM "TotalBalance" ORDER BY "balance" LIMIT 1;`,
      ]);

    console.log(income, expense, categoryIncome, categoryExpense, totalBalance);
  }
}

@Injectable()
export class AddLogUser {
  constructor(private readonly prisma: PrismaService) {}
  @Cron('*/5 * * * * *')
  async addLog(): Promise<void> {
    
    const contex = readFileSync('./src/log/login.log.txt', 'utf-8');
    console.log(contex)
    const qqq = await this.prisma.logUser.upsert({
      create: {
            log: contex,
      },
      update: {
            log: contex,
      },
      where: {
            id: 1,
          },
    })
    console.log(qqq)
  }
}
