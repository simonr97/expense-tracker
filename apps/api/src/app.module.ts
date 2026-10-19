import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExpensesModule } from './expenses/expenses.module';
import { PrismaModule } from './prisma/prisma.module';
import { CategoriesModule } from './categories/categories.module';
import { AccountsModule } from './accounts/accounts.module';
import { MerchantsModule } from './merchants/merchants.module';
import { PrismaErrorCatch } from './exception-filter/prisma-error-catch';
import { APP_FILTER } from '@nestjs/core';
import { CatchEverythingFilter } from './exception-filter/http-error-catch';

@Module({
  imports: [ExpensesModule, PrismaModule, CategoriesModule, AccountsModule, MerchantsModule],
  controllers: [AppController],
  providers: [
    AppService,
        {
      provide: APP_FILTER,
      useClass: CatchEverythingFilter
    },
    {
      provide: APP_FILTER,
      useClass: PrismaErrorCatch
    }
  ],
})
export class AppModule {}
