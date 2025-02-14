import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AnyFilesInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { FilesValidationPipe } from 'src/common/pipes/files-validation/files-validation.pipe';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Post()
  @UseInterceptors(FilesInterceptor('files', 10))
  create(@Body() createPostDto: CreatePostDto, @UploadedFiles(new FilesValidationPipe()) files : Array<Express.Multer.File>) {
    return this.postService.create({
      title: createPostDto.title,
      description: createPostDto.description,
      user_id: +createPostDto.user_id,
      files: files
    });
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
