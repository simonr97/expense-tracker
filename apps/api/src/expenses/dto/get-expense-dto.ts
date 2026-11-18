import { Matches } from "class-validator";

export class GetExpenseDTO {
    //YYYY-MM
    @Matches(/^\d{4}-(0[1-9]|1[0-2])$/, { message: 'year-month must use the YYYY-MM format' })
    yearMonth: string;
}