import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { PostModule } from '../post/post.module';
@Module({
  imports: [
    MulterModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => configService.get('multer'),
    }),
    TypeOrmModule.forFeature([File]),
  ],
  controllers: [FileController],
  providers: [FileService],
  exports : [FileService]

})
export class FileModule { }
