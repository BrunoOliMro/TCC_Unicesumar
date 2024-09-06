import { Transform } from "class-transformer";
import { IsBoolean, IsInt, IsNotEmpty, IsString, Matches, Min, MinLength } from "class-validator";

export class CreateODFDTO {

    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @Transform(({ value }) => value.trim())
    odf: string;

    @IsInt()
    @IsNotEmpty()
    @Min(1)
    item_id: number;

    @IsInt()
    @IsNotEmpty()
    @Min(1)
    odf_qtd: number;

    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @Transform(({ value }) => value.trim())
    @Matches(/^(19|20)\d\d(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])$/)
    ship_date: string;

}

// export class ChangeODFActivationDTO {

//     @IsInt()
//     @IsNotEmpty()
//     @Min(1)
//     odf_id: number;

//     @IsBoolean()
//     @IsNotEmpty()
//     active: boolean;

// }

export class AlterCriticOdfDTO {

    @IsInt()
    @IsNotEmpty()
    @Min(1)
    odf_id: number;

    @IsBoolean()
    @IsNotEmpty()
    critic: boolean;

}

export class UpdateODFInfo {

    @IsInt()
    @IsNotEmpty()
    @Min(1)
    odf_id: number;

    @IsInt()
    @IsNotEmpty()
    @Min(1)
    odf_qtd: number;

    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @Transform(({ value }) => value.trim())
    @Matches(/^(19|20)\d\d(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])$/)
    ship_date: string;

}

export class DeleteOdfDTO {

    @IsInt()
    @IsNotEmpty()
    @Min(1)
    odf_id: number;

}

export class FindOdfProcessesQuery {
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    @Transform(({ value }) => parseInt(value))
    odf_id: number;
}