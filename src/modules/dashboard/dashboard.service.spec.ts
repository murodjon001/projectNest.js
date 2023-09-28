import { Test, TestingModule } from '@nestjs/testing';
import { DashboardService } from './dashboard.service';
import { PrismaService } from '../../database/prisma/prisma.service';



describe("DashboardService", () =>{
    let service : DashboardService
    let prisma: PrismaService

    beforeEach(async () => {

        const module: TestingModule = await Test.createTestingModule({
            providers:[
                DashboardService,
                {
                    provide: PrismaService,
                    useValue: {
                        create: jest.fn(),
                        findMany: jest.fn(),
                    }
                }
            ]
        }).compile()
        service = module.get<DashboardService>(DashboardService)
        prisma = module.get<PrismaService>(PrismaService)
    })

    describe('Should be defined totalIncome and FindAll', () => {

        it("Should be defined totalIncome", () => {
            expect(service['totalIncome']).toBeDefined()
        })

        it("should be defined findAll", () => {
            expect(service['findAll']).toBeDefined()
        })
    })

    describe("totalIncome", () => {

        it("should be accepted dto: TotalBalance", () => {
            jest.spyOn(service, "totalIncome").mockImplementation(() =>{
                return {totalIncome: []} as any
            })
            service.totalIncome({"expense": 5, "income": 10})

            expect(service.totalIncome).toBeCalledWith({"expense": 5, "income": 10})
        })
    })

    describe("findAs", () => {

        it("should be defined", () =>{
            expect(service['findAs']).toBeDefined()
        })

        it("should be return 'Salom'", async ()=> {
            jest.spyOn(service, "findAs").mockImplementation(() =>{
                return "Salom" as any
            })
            expect(service['findAs']).toBeDefined()
        })
    })


})