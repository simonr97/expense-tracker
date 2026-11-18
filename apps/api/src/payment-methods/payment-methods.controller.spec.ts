import { Test, TestingModule } from '@nestjs/testing';
import { PaymentMethodsController } from './payment-methods.controller';
import { PaymentMethodsService } from './payment-methods.service';
import { PrismaService } from '../prisma/prisma.service';

describe('PaymentMethodsController', () => {
  let controller: PaymentMethodsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentMethodsController],
      // The real service with an empty Prisma stub: enough to build the module, no database.
      providers: [
        PaymentMethodsService,
        { provide: PrismaService, useValue: {} },
      ],
    }).compile();

    controller = module.get<PaymentMethodsController>(PaymentMethodsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
