import { Transform } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class CreatePaymentMethodDTO {

    @IsNotEmpty()
    @IsString()
    @Transform(({value})=> typeof value === 'string' ? value.trim(): value)
    name: string;
    
}