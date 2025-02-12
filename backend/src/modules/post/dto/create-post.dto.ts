import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePostDto {
    @IsNotEmpty()
    @IsString()
    title

    @IsString()
    description

    @IsNotEmpty()
    @IsNumber()
    user_id
}
