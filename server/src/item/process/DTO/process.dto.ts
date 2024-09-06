import { Transform } from "class-transformer";
import { IsInt, IsNotEmpty, IsNumber, Min } from "class-validator";

export class FindPartNumberProcessesDTO {

    @IsNotEmpty()
    @IsInt()
    @Transform(({ value }) => parseInt(value))
    @Min(1)
    item_id: number;

}

export class CreateItemProcessDTO {

    @IsNotEmpty()
    @IsInt()
    item_id: number;

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    machine_id: number;

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    op_num: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    execut_time: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    setup_time: number;

}

export class EditItemProcessDTO {

    @IsNotEmpty()
    @IsInt()
    process_id: number;

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    op_num: number;

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    machine_id: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    execut_time: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    setup_time: number;

}

export class DeleteItemProcessDTO {

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    process_id: number;

}

export class FindProcessNeededItemsInfoDTO {

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    @Transform(({ value }) => parseInt(value))
    process_id: number;

}
