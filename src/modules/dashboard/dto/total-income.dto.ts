import { IsNotEmpty, IsNumber } from "class-validator";

export class TotalBalance {
    
    @IsNotEmpty()
    @IsNumber()
    income: number

    @IsNotEmpty()
    @IsNumber()
    expense: number

}