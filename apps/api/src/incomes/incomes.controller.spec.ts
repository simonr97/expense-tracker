import { Test, TestingModule } from '@nestjs/testing';
import { IncomesController } from './incomes.controller';
import { IncomesService } from './incomes.service';
import { PrismaService } from '../prisma/prisma.service';

describe('IncomesController', () => {
  let controller: IncomesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IncomesController],
      // The real service with an empty Prisma stub: enough to build the module, no database.
      providers: [IncomesService, { provide: PrismaService, useValue: {} }],
    }).compile();

    controller = module.get<IncomesController>(IncomesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
