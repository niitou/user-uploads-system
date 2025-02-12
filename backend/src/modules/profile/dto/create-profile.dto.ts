import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProfileDto {
    @IsNumber()
    @IsNotEmpty()
    user_id
}
