import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeormConfig from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal : true,
      load : [typeormConfig]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory : async (configService : ConfigService) => configService.get('typeorm')
    }),
    JwtModule.register({
      secret : process.env.JWT_SECRET,
      signOptions : {expiresIn: "1h"}
    }),
    UsersModule,
    PassportModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule {}
