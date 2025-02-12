import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { join, extname } from 'path';
import * as fs from 'fs'

@Injectable()
export class FilesValidationPipe implements PipeTransform {
  private readonly maxFileSize = 1024 * 1024 * 50 // 50 mb max
  private readonly allowedExtensions = ['.png', '.jpg', '.jpeg', '.mp4', '.mov']
  removeFile(files: Array<Express.Multer.File>, message: string) {
    files.forEach(file => {
      fs.unlink(join('uploads', file.filename), (err) => {
        if (err) throw err;
        console.log(`${file.filename} is deleted`);
      });
    });

    throw new BadRequestException(message)
  }

  transform(files: Array<Express.Multer.File>, metadata: ArgumentMetadata) {
    const extensions = files.map((file) => extname(file.originalname));
    const fileSizes = files.map((file) => file.size);

    fileSizes.forEach((fileSize, index) => {
      const extension = extensions[index];

      if (!this.allowedExtensions.includes(extension)) {
        this.removeFile(
          files,
          `File type ${extension} is not supported`,
        );
      }

      if (fileSize > this.maxFileSize) {
        this.removeFile(files, `File size is too large`);
      }
    });

    return files;
  }
}
