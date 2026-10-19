import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAccountDTO } from './dto/create-account-dto';

@Injectable()
export class AccountsService {
  constructor(private readonly prisma: PrismaService) {}

  async createAccount(account: CreateAccountDTO) {
    const accountCreation = await this.prisma.account.create({
      data: { ...account },
    });
    return accountCreation;
  }

  async getAccounts() {
    const accounts = await this.prisma.account.findMany();
    return accounts;
  }
}
