import { Transform } from "class-transformer";
import { IsInt, IsNotEmpty, IsString, Min, MinLength } from "class-validator";

export class AddItemImgDTO {

    @IsInt()
    @IsNotEmpty()
    @Min(1)
    @Transform(({ value }) => parseInt(value))
    item_id: number;

}

export class AddToolImgDTO {

    @IsInt()
    @IsNotEmpty()
    @Min(1)
    @Transform(({ value }) => parseInt(value))
    tool_id: number;

}

export class FindItemImgDTO {

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    @Transform(({ value }) => parseInt(value))
    item_id: number;

}

export class FindToolImgDTO {

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    @Transform(({ value }) => parseInt(value))
    tool_id: number;

}