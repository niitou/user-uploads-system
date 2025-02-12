import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateFileDto {
    @IsString()
    filename

    @IsNumber()
    post
}
