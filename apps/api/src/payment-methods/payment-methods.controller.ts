import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatePaymentMethodDTO } from './dto/create-payment-method-dto';
import { PaymentMethodsService } from './payment-methods.service';

@Controller('payment-methods')
export class PaymentMethodsController {
    constructor(private readonly paymentMethods: PaymentMethodsService){}

    @Post()
    async createPaymentMethod(@Body() dto: CreatePaymentMethodDTO){
        return await this.paymentMethods.createPaymentMethod(dto);
    }

    @Get()
    async getPaymentMethods(){
        return await this.paymentMethods.getPaymentMethods()
    }
}
