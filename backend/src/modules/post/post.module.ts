import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports : [TypeOrmModule.forFeature([Post]), UsersModule],
  controllers: [PostController],
  providers: [PostService],
  exports : [PostService]
})
export class PostModule {}
