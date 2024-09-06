import { Transform } from "class-transformer";
import { IsIn, IsInt, IsNotEmpty, Min } from "class-validator";

export class AddUserDTO {

    @IsInt()
    @IsNotEmpty()
    @Min(1)
    user_id: number;

    @IsInt()
    @IsNotEmpty()
    @IsIn([0, 1])
    next_admin: 0 | 1;

}

export class FindUserInfoQueryParamsDTO {

    @IsInt()
    @IsNotEmpty()
    @Min(1)
    @Transform(({ value }) => parseInt(value))
    user_id: number;

}

export class EditUserDTO {

    @IsInt()
    @IsNotEmpty()
    @Min(1)
    user_id: number;

    @IsInt()
    @IsNotEmpty()
    @IsIn([0, 1])
    next_admin: 0 | 1;

}

export class DeleteUserDTO {

    @IsInt()
    @IsNotEmpty()
    @Min(1)
    user_id: number;

}