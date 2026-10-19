import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';

import { ExpenseStatus } from '../../../generated/prisma/enums';
import { Type } from 'class-transformer';

export class CreateExpenseDTO {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsPositive()
  amount: number;

  @IsUUID('all')
  @IsNotEmpty()
  categoryId: string;

  @IsUUID('all')
  @IsNotEmpty()
  accountId: string;

  @IsUUID('all')
  @IsNotEmpty()
  merchantId: string;

  @IsOptional()
  @IsString()
  notes: string | undefined;

  @IsEnum(ExpenseStatus)
  @IsOptional()
  status: ExpenseStatus;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  date: Date;
}
