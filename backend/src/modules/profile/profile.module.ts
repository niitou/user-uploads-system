import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { UsersModule } from '../users/users.module';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';

@Module({
  imports : [TypeOrmModule.forFeature([Profile]), MulterModule.registerAsync({
    inject : [ConfigService],
    useFactory: async (configService : ConfigService) => configService.get('multer')
  })],
  controllers: [ProfileController],
  providers: [ProfileService],
  exports : [ProfileService]
})
export class ProfileModule {}
