import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateMerchantsDTO } from "./dto/create-merchants-dto";
import { MerchantsService } from "./merchants.service";

@Controller('merchants')
export class MerchantsController {
    constructor(private readonly merchant: MerchantsService){}

    @Post()
    async createMerchant(@Body() dto:CreateMerchantsDTO){
        return await this.merchant.createMerchant(dto);
    }

    @Get()
    async getMerchants(){
        return await this.merchant.getMerchants();
    }
}