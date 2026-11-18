import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUUID, Max } from "class-validator";
import { Transform } from "class-transformer";
import { toArgentinaDate } from "../../common/argentina-date";
import { Currency } from "../../../generated/prisma/enums";

export class CreateIncomeDTO {

    @IsString()
    @IsNotEmpty()
    @Transform(({value})=> typeof value === 'string' ? value.trim(): value)
    description:string;

    @IsNumber({maxDecimalPlaces:2})
    @IsPositive()
    @Max(99999999.99)
    amount:number;

    @IsDate()
    @Transform(({ value }) => toArgentinaDate(value))
    @IsOptional()
    date: Date;

    @IsEnum(Currency)
    @IsNotEmpty()
    currency: Currency;

    @IsUUID('all')
    @IsNotEmpty()
    accountId: string;

}