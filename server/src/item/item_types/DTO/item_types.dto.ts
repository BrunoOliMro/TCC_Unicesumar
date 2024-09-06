import { Transform } from "class-transformer";
import { IsInt, IsNotEmpty, IsString, Min, MinLength } from "class-validator";

export class CreateItemTypeDTO {

    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @Transform(({ value }) => value.trim())
    item_type: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @Transform(({ value }) => value.trim())
    item_hex: string;

}

export class EditItemTypeDTO {

    @IsInt()
    @IsNotEmpty()
    @Min(1)
    item_type_id: number;

    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @Transform(({ value }) => value.trim())
    item_hex: string;

}

export class DeleteItemTypeDTO {

    @IsInt()
    @IsNotEmpty()
    @Min(1)
    item_type_id: number;

}