import { Transform } from "class-transformer";
import { IsInt, IsNotEmpty, IsString, Min, MinLength } from "class-validator";

export class AddMachineShiftDTO {

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    machine_id: number;

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    machine_index: number;

    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @Transform(({ value }) => value.trim())
    start_time: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @Transform(({ value }) => value.trim())
    end_time: string;

}

export class DeleteMachineShiftDTO {

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    machine_id: number;

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    machine_index: number;

    @IsNotEmpty()
    @IsInt()
    shift_id: number;

}