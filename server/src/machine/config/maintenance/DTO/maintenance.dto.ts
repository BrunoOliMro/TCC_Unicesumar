import { Transform } from "class-transformer";
import { IsInt, IsNotEmpty, IsString, Min, MinLength } from "class-validator";

export class AddMachineMaintenanceDTO {

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
    start_date: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @Transform(({ value }) => value.trim())
    end_date: string;

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

export class DeleteMachineMaintenanceDTO {

    @IsNotEmpty()
    @IsInt()
    machine_id: number;

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    machine_index: number;

    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @Transform(({ value }) => value.trim())
    maintenance_uuid: string;

}