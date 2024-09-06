import { IsInt, IsNotEmpty, IsString, Matches, Min } from "class-validator";

export class AddHolidayDTO {

    @IsString()
    @IsNotEmpty()
    @Matches(/^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[012])-(19|20)\d\d$/)
    holiday_date: string;

}

export class DeleteHolidayDTO {

    @IsInt()
    @IsNotEmpty()
    @Min(1)
    holiday_id: number;

}