import { IsEmpty, IsString } from 'class-validator';
import { Optional } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsNull } from 'typeorm';

export class UpdatePostDto {
    @IsString()
    @Optional()
    title

    @Transform(({ value }) => value === 'null' ? null : value)
    @Optional()
    description
}
