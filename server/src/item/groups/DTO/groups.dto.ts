import { Transform } from "class-transformer";
import { IsInt, IsNotEmpty, IsString, Min, MinLength } from "class-validator";

export class CreateGroupingDTO {

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    machine_id: number;

    @IsNotEmpty()
    @IsString()
    @Transform(({ value }) => value.trim())
    @MinLength(1)
    grouping: string;

}

export class DeleteGroupingDTO {

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    grouping_id: number;

}

export class FindGroupingProcessesParams {
    @IsNotEmpty()
    @IsInt()
    @Transform(({ value }) => parseInt(value))
    grouping_id: number;
}

export class AddProcessToGroupingDTO {

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    odf_id: number;

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    process_id: number;

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    grouping_id: number;

}

export class DeleteProcessFromGroupingDTO {

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    odf_id: number;

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    process_id: number;

}