import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService
  ) {}

  @Post('signup')
  async signup(@Body() body: {username : string, password : string}) {
    return this.userService.create(body)
  }

  @Post('login')
  async login(@Body() body: {username: string, password: string}){
    return this.authService.login(body.username, body.password)
  }
}
