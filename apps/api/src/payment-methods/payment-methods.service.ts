import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentMethodDTO } from './dto/create-payment-method-dto';

@Injectable()
export class PaymentMethodsService {
  constructor(private readonly prisma: PrismaService) {}

  async createPaymentMethod(paymentMethod: CreatePaymentMethodDTO) {
    const paymentMethodCreation = await this.prisma.paymentMethod.create({
      data: { ...paymentMethod },
    });
    return paymentMethodCreation;
  }

  async getPaymentMethods() {
    const paymentMethods = this.prisma.paymentMethod.findMany();
    return paymentMethods;
  }
}
