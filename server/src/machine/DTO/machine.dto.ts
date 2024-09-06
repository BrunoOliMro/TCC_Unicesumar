import { Transform } from "class-transformer";
import { IsInt, IsNotEmpty, IsString, Max, Min } from "class-validator";

export class MachineDTO {

    @IsNotEmpty()
    @IsInt()
    @Transform(({ value }) => parseInt(value))
    machine_id: number;

    @IsNotEmpty()
    @IsInt()
    @Transform(({ value }) => parseInt(value))
    machine_index: number;

}

export class DeleteMachineDTO {

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    machine_id: number;

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    machine_index: number;

}

export class EditMachineDTO {

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
    @Min(1)
    machine_group_id: number;

    @IsNotEmpty()
    @IsInt()
    @Max(720)
    @Min(0)
    month_load: number;

    @IsNotEmpty()
    @IsInt()
    @Max(100)
    @Min(0)
    efficiency: number;

    @IsNotEmpty()
    @IsInt()
    @Max(31)
    @Min(0)
    working_days: number;

}

export class CreateMachineDTO {

    @IsNotEmpty()
    @IsString()
    machine: string;

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    machine_group_id: number;

    @IsNotEmpty()
    @IsInt()
    @Max(720)
    @Min(0)
    month_load: number;

    @IsNotEmpty()
    @IsInt()
    @Max(100)
    @Min(0)
    efficiency: number;

    @IsNotEmpty()
    @IsInt()
    @Max(31)
    @Min(0)
    working_days: number;

}