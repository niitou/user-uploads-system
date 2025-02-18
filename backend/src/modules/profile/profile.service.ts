import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs'
import { join } from 'path';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>
  ) { }
  create(createProfileDto: CreateProfileDto) {
    return `This action create a profile`
  }

  findAll() {
    return `This action returns all profile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} profile`;
  }

  async update(id: number, updateProfileDto: UpdateProfileDto) {
    const user = await this.profileRepository.findOneBy({ id })
    if (!user) throw new BadRequestException("User Not Found !")

    // Remove old profile pic if exist
    if (user.avatar) {
      fs.unlink(join("public", user.avatar), (err) => {
        if (err) {
          console.error(err.message)
        }
      })
    }

    Object.assign(user, updateProfileDto)

    return this.profileRepository.save(user)

  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
