import { Transform } from "class-transformer";
import { IsInt, IsNotEmpty, IsString, Min, MinLength } from "class-validator";

export class FindProcessToolsDTO {

    @IsNotEmpty()
    @Min(1)
    @IsInt()
    @Transform(({ value }) => parseInt(value))
    process_id: number;

}

export class AddProcessToolDTO {

    @IsNotEmpty()
    @Min(1)
    @IsInt()
    process_id: number;

    @IsNotEmpty()
    @MinLength(1)
    @IsString()
    @Transform(({ value }) => value.trim())
    tool_name: string;

}

export class DeleteProcessToolDTO {

    @IsNotEmpty()
    @Min(1)
    @IsInt()
    process_id: number;

    @IsNotEmpty()
    @Min(1)
    @IsInt()
    tool_id: number;

}