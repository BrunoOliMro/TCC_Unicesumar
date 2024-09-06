import { IsNotEmpty, IsString } from 'class-validator';

export class HeaderDTO {

    @IsNotEmpty()
    @IsString()
    authorization: string;

}