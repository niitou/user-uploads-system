import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { Repository } from 'typeorm';
import { PostService } from '../post/post.service';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File) private fileRepository : Repository<File>,
    private readonly postService : PostService
  ) {}

  async createAvatar(createFileDto: CreateFileDto) {
    const file = this.fileRepository.create({
      filename : createFileDto.filename,
      path : createFileDto.path.split("\\")[0],
      post : createFileDto.post
    })

    console.log(file)
    return this.fileRepository.save(file)
  }

  findAll() {
    return `This action returns all file`;
  }

  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  update(id: number, updateFileDto: UpdateFileDto) {
    return `This action updates a #${id} file`;
  }

  remove(id: number) {
    return `This action removes a #${id} file`;
  }
}
