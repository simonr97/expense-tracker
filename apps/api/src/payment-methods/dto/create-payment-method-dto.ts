import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePaymentMethodDTO {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  name: string;
}
