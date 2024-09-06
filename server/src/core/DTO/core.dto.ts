import { Transform } from "class-transformer";
import { IsInt, IsNotEmpty, IsString, Min, MinLength } from "class-validator";

export class AddSequenceTimerDTO {

    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @Transform(({ value }) => value.trim())
    sequence_timer: string;

}

export class DeleteSequenceTimerDTO {

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    sequence_timer_id: number;

}