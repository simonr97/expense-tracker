import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  Max,
} from 'class-validator';

import { Currency, ExpenseStatus } from '../../../generated/prisma/enums';
import { Transform } from 'class-transformer';
import { toArgentinaDate } from '../../common/argentina-date';

export class CreateExpenseDTO {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  description: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @Max(99999999.99)
  amount: number;

  @IsOptional()
  @IsString()
  notes: string | undefined;

  @IsEnum(ExpenseStatus)
  @IsOptional()
  status: ExpenseStatus;

  @IsEnum(Currency)
  @IsNotEmpty()
  currency: Currency;

  @IsDate()
  @Transform(({ value }) => toArgentinaDate(value))
  @IsOptional()
  date: Date;

  @IsUUID('all')
  @IsNotEmpty()
  categoryId: string;

  @IsUUID('all')
  @IsNotEmpty()
  accountId: string;

  @IsUUID('all')
  @IsNotEmpty()
  merchantId: string;

  @IsUUID('all')
  @IsNotEmpty()
  paymentMethodId: string;
}
