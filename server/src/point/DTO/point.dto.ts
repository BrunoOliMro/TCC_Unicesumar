import { IsInt, IsNotEmpty, Min } from "class-validator";

export class UpdatePointQtdDTO {

    @IsNotEmpty()
    @Min(1)
    @IsInt()
    process_id: number;

    @IsNotEmpty()
    @Min(1)
    @IsInt()
    odf_id: number;

    @IsNotEmpty()
    @Min(0)
    @IsInt()
    finished_qtd: number;

    @IsNotEmpty()
    @Min(0)
    @IsInt()
    missing_qtd: number;

    @IsNotEmpty()
    @Min(0)
    @IsInt()
    refused_qtd: number;

}

export class FinishGroupPointingDTO {

    @IsNotEmpty()
    @Min(1)
    @IsInt()
    group_id: number;

}