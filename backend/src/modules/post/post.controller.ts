import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFiles, UseInterceptors, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FilesInterceptor, NoFilesInterceptor } from '@nestjs/platform-express';
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
  findAll(@Query('search') search?: String) {
    return this.postService.findAll(search);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findPostByUser(+id);
  }

  @Patch(':id')
  @UseInterceptors(NoFilesInterceptor())
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    console.log(updatePostDto)
    return this.postService.update(+id, {
      title : updatePostDto.title,
      description : updatePostDto.description
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
