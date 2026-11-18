import { Test, TestingModule } from '@nestjs/testing';
import { PaymentMethodsService } from './payment-methods.service';
import { PrismaService } from '../prisma/prisma.service';

describe('PaymentMethodsService', () => {
  let service: PaymentMethodsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // Empty Prisma stub: enough to build the module, no database.
      providers: [
        PaymentMethodsService,
        { provide: PrismaService, useValue: {} },
      ],
    }).compile();

    service = module.get<PaymentMethodsService>(PaymentMethodsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
