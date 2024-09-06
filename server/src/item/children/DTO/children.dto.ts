import { Transform } from "class-transformer";
import { IsInt, IsNotEmpty, Min } from "class-validator";

export class FindProcessChildItemsParamsDTO {

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    @Transform(({ value }) => parseInt(value))
    process_id: number;

}

export class AddChildItemDTO {

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    parent_process_id: number;

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    children_item_id: number;

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    item_qtd: number;

}

export class EditChildItemDTO {

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    parent_process_id: number;

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    children_item_id: number;

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    item_qtd: number;

}
export class DeleteChildItemDTO {

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    parent_process_id: number;

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    children_item_id: number;

}