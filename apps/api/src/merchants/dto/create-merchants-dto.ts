import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMerchantsDTO {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  name: string;
}
