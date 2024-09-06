import { Transform } from "class-transformer";
import { IsInt, IsNotEmpty, IsNumber, IsString, Min, MinLength } from "class-validator";

export class AddItemToStockDTO {

    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @Transform(({ value }) => value.trim())
    material_name: string;

    @IsInt()
    @IsNotEmpty()
    @Min(0)
    material_qtd: number;

}

export class EditStockItemDTO {

    @IsInt()
    @IsNotEmpty()
    @Min(1)
    stock_id: number;

    @IsInt()
    @IsNotEmpty()
    @Min(0)
    material_qtd: number;

}

export class DeleteItemFromStockDTO {

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    stock_id: number;

}

export class FindProcessMaterialsDTO {

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    @Transform(({ value }) => parseInt(value))
    process_id: number;

}

export class UpdateProcessMaterialDTO {

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    process_id: number;

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    material_id: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    material_qtd: number;

}

export class DeleteProcessMaterialDTO {

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    process_id: number;

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    material_id: number;

}

export class AddProcessMaterialDTO {

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    process_id: number;

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    material_id: number;

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    material_qtd: number;

}