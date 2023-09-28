import { Test, TestingModule } from '@nestjs/testing';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { PrismaModule } from '../../database/prisma/prisma.modul';

describe('DashboardController', () => {
  let dashboardController: DashboardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [DashboardService],
      controllers: [DashboardController],
    }).compile();

    dashboardController = module.get<DashboardController>(DashboardController);
  });

  it('should be defined', () => {
    expect(dashboardController).toBeDefined();
  });

  describe('findAll', ()=> {
    it("should be defined", () => {
        expect(dashboardController['findAll']).toBeDefined();
    })
  })

  describe('totalIncome', () => {
    it ("should be accepted dto", ()=> {
        jest.spyOn(dashboardController, 'totalIncome').mockImplementation(() => {
            return {income_amount: []} as any  // soxta funksya ishlamoqda va natijani qaytarmoqda
        })
        dashboardController.totalIncome({"expense":100, "income":100}) 

        expect(dashboardController.totalIncome).toBeCalledWith({"expense":100, "income":100}) // Soxta funktsiya maxsus argumentlar bilan chaqirilganligiga ishonch hosil qiling.
    })
    })
  });
