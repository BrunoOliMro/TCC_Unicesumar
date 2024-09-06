import { IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export class CreateMachineGroupDTO {

    @IsNotEmpty()
    @IsString()
    machine_group: string;

}

export class AddProcessToGroupingDTO {

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    grouping_id: number;

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    process_id: number;

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    odf_id: number;

}

export class DeleteMachineGroupDTO {

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    machine_group_id: number;

}