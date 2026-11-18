import { IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateAccountDTO {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  name: string;
}
