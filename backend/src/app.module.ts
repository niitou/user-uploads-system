import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeormConfig from './common/config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './modules/auth/auth.controller';
import { AuthService } from './modules/auth/auth.service';
import { FileModule } from './modules/file/file.module';
import { ProfileModule } from './modules/profile/profile.module';
import { PostModule } from './modules/post/post.module';
import { MulterModule } from '@nestjs/platform-express';
import multerConfig from './common/config/multer.config';
import { FileController } from './modules/file/file.controller';
import { FileService } from './modules/file/file.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal : true,
      load : [typeormConfig, multerConfig]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory : async (configService : ConfigService) => configService.get('typeorm')
    }),
    JwtModule.register({
      secret : process.env.JWT_SECRET,
      signOptions : {expiresIn: "1h"}
    }),
    MulterModule.registerAsync({
      inject : [ConfigService],
      useFactory : async (configService : ConfigService) => configService.get('multer'),
    }),
    UsersModule,
    PassportModule,
    FileModule,
    ProfileModule,
    PostModule,
  ],
  controllers: [AppController, AuthController, FileController], 
  // Multer won't work for some reason if the the FileController is not declared here
  providers: [AppService, AuthService, FileService],
})
export class AppModule {}
