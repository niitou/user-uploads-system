import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    private readonly userService : UsersService
  ) { }

  async create(createPostDto: CreatePostDto) {
    const user = await this.userService.findOne(createPostDto.user_id)
    if(!user) {
      throw new BadRequestException("User is not exist !")
    }
    const post = this.postRepository.create({
      title : createPostDto.title,
      description : createPostDto.description,
      user : user
    })

    return this.postRepository.save(post)
  }

  findAll() {
    return `This action returns all post`;
  }

  findOne(id: number) {
    return this.postRepository.findOneBy({id});
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
