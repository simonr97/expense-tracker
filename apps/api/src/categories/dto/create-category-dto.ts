import { IsNotEmpty, IsString } from 'class-validator';
import { Transform } from "class-transformer";

export class CreateCategoryDTO {
  @IsString()
  @IsNotEmpty()
  @Transform(({value})=> typeof value === 'string' ? value.trim(): value)
  name: string;

  @IsString()
  @IsNotEmpty()
  color: string;

  @IsString()
  @IsNotEmpty()
  icon: string;
}
