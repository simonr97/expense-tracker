import { Body, Controller, Get, Post } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDTO } from './dto/create-account-dto';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accounts: AccountsService) {}

  @Post()
  async createAccount(@Body() dto: CreateAccountDTO) {
    return await this.accounts.createAccount(dto);
  }

  @Get()
  async getAccounts() {
    return await this.accounts.getAccounts();
  }
}
