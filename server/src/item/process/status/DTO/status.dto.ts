import { IsInt, IsNotEmpty, Min } from "class-validator";

export class AddRemodelProcessDTO {

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    process_id: number;

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    odf_id: number;

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    remodel_index: number;

}

export class DeleteRemodelProcessDTO {

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    process_id: number;

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    odf_id: number;

}