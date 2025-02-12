import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs'
import { Profile } from '../profile/entities/profile.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    // Check if user already exist
    const existingUser = await this.userRepository.findOne({ where: { username: createUserDto.username } })
    if(existingUser) {
      throw new ConflictException('Username is already in used')
    }

    const profile = new Profile()
    profile.username = createUserDto.username

    // Hash password
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10)
    const user = this.userRepository.create({username: createUserDto.username, password: hashedPassword, profile: profile})
    return this.userRepository.save(user)
  }

  async validate(username: string, password: string){
    const user = await this.userRepository.findOne({where : {username : username}})
    if(!user) return null

    const isPasswordValid = await bcrypt.compare(password, user.password)
    return isPasswordValid ? user : null
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({id});
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
