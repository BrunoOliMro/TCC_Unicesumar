import { Transform } from "class-transformer";
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min, MinLength } from "class-validator";

export class CreateItemDTO {

    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @Transform(({ value }) => value.trim())
    part_number: string;

    @IsOptional()
    @IsInt()
    part_number_type_id: number;

    @IsNotEmpty()
    @IsNumber()
    price: number;


}

export class EditItemDTO {

    @IsNotEmpty()
    @IsInt()
    part_number_id: number;

    @IsNotEmpty()
    @IsInt()
    part_number_type_id: number;

    @IsNotEmpty()
    @IsNumber()
    price: number;

}

export class DeleteItemDTO {

    @IsNotEmpty()
    @IsInt()
    part_number_id: number;

}