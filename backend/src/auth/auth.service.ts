import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) { }

    async login(username: string, password: string) {
        const user = await this.userService.validate(username, password)
        if (!user) throw new UnauthorizedException('Invalid credentials')

        const payload = { username: user.username, sub: user.id }
        const accessToken = this.jwtService.sign(payload)

        return { accessToken }
    }
}
