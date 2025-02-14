import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AvatarValidationPipe } from 'src/common/pipes/avatar-validation/avatar-validation.pipe';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  uploadFile(@UploadedFile() file: Express.Multer.File, post: number){
    return this.fileService.create({
      filename: file.filename,
      post: post
    })
  }
  
}
