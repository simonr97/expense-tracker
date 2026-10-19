import { Test, TestingModule } from '@nestjs/testing';
import { AccountsService } from './accounts.service';
import { beforeEach, describe, it } from 'node:test';
import { expect } from '@playwright/test';

describe('AccountsService', () => {
  let service: AccountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountsService],
    }).compile();

    service = module.get<AccountsService>(AccountsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
