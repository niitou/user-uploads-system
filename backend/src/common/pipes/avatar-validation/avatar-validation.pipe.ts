import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import * as fs from 'fs'
import { extname, join } from 'path';

@Injectable()
export class AvatarValidationPipe implements PipeTransform {
  private readonly maxFileSize = 1024 * 1024 * 10 // 10 mb max
  private readonly allowedExtensions = ['.png', '.jpg', '.jpeg']

  removeFile(value: Express.Multer.File, message: string) {
    console.log(value)
    fs.unlink(join('uploads' , value.filename), (err) => {
      if (err) throw err
      console.log(`${value.filename} is deleted`)
    })
    throw new BadRequestException(message)
  }
  transform(value: Express.Multer.File, metadata: ArgumentMetadata) {
    const extension = extname(value.originalname)
    const fileSize = value.size

    if (!this.allowedExtensions.includes(extension)) {
      this.removeFile(value, `File type ${extension} is not supported`);
    }

    if (fileSize > this.maxFileSize) {
      this.removeFile(value, `File size is too large`);
    }

    return value;
  }
}
