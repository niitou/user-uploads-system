import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile) private profileRepository : Repository<Profile>,
    private readonly userService : UsersService
  ){}
  async create(createProfileDto: CreateProfileDto) {
    const user = await this.userService.findOne(createProfileDto.user_id)
    if(!user) {
      throw new BadRequestException("User is not found")
    }

    const profile = this.profileRepository.create({
      file : null,
      username : user.username.toLocaleLowerCase().replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-+|-+$/g, ''),
      user : user
    })

    return this.profileRepository.save(profile)
  }

  findAll() {
    return `This action returns all profile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} profile`;
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
