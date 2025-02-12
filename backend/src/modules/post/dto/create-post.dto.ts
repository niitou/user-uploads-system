import { IsNotEmpty, IsString } from "class-validator";

export class CreatePostDto {
    @IsNotEmpty()
    @IsString()
    title

    @IsString()
    description

    @IsNotEmpty()
    @IsString()
    user_id

    files : Array<Express.Multer.File>
}
