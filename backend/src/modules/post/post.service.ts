import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { File } from '../file/entities/file.entity';
import * as fs from 'fs'
import { join } from 'path';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    private readonly userService: UsersService
  ) { }

  async create(createPostDto: CreatePostDto) {
    const user = await this.userService.findOne(createPostDto.user_id)
    if (!user) {
      throw new BadRequestException("User is not exist !")
    }

    const files = createPostDto.files.map(fileData => {
      const file = new File()
      file.filename = fileData.filename
      return file
    })
    // Don't forget to asign file(s) to postRepository when making post
    const post = this.postRepository.create({
      title: createPostDto.title,
      description: createPostDto.description,
      user: user,
      files: files
    })

    return this.postRepository.save(post)
  }

  async findAll() {
    // Need to add Pagination
    const posts = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user') // Join Users table
      .leftJoinAndSelect('user.profile', 'profile') // Join Profile via User
      .leftJoinAndSelect('post.files', 'files') // Join File table
      .select(["post.id", "post.title", "post.description", "post.created_at", "files.id", "files.filename", "user.id", "profile.id", "profile.username"]) // Select required fields
      .getMany()

    return posts
  }

  async findPostByUser(id: number) {
    // need to add pagination
    const posts = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .leftJoinAndSelect('post.files', 'files')
      .select(['post.id', 'post.title', 'post.description', 'post.created_at', 'files.id', 'files.filename'])
      .where("user.id = :id", { id: id })
      .getMany()

    return posts
  }

  findOne(id: number) {
    return this.postRepository.findOneBy({ id });
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  async remove(id: number) {
    const post = await this.postRepository.createQueryBuilder('post')
      .leftJoinAndSelect('post.files', 'files')
      .select(['post.id', 'files.filename'])
      .where("post.id = :id", { id: id })
      .getOne()
    console.log(post)
    if (!post) {
      throw new NotFoundException("Post is not found")
    }
    // remove files from public folder
    post.files.map(file => (
      fs.unlink(join("public", file.filename), (err) => {
        if (err) {
          console.error(err.message)
        }
      })
    ))
    return this.postRepository.delete(id)
  }
}
