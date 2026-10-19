import { IsNotEmpty, IsString } from 'class-validator';
import { Transform } from "class-transformer";

export class CreateAccountDTO {
  @IsNotEmpty()
  @IsString()
  @Transform(({value})=> typeof value === 'string' ? value.trim(): value)
  name: string;
}
