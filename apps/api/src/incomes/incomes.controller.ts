import { Body, Controller, Post, Get } from '@nestjs/common';
import { IncomesService } from './incomes.service';
import { CreateIncomeDTO } from './dto/create-income-dto';

@Controller('incomes')
export class IncomesController {
    constructor(private readonly incomes:IncomesService){}

    @Post()
    async createIncomes(@Body() dto:CreateIncomeDTO){
        return await this.incomes.createIncome(dto);
    }

    @Get()
    async getIncomes(){
        return await this.incomes.getIncome()
    }
}
