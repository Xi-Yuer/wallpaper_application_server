import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import * as argon2 from 'argon2';
import { Repository } from 'typeorm';
import { Role } from '../roles/entities/role.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { QueryUser } from './dto/query-user.dto';
import { RoleEnum } from 'src/enum/role.enum';
import { UploadsService } from '../alioss/upload.service';
import { OSS_Config } from 'src/config/oss.config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    private readonly uploadService: UploadsService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const role = await this.roleRepository.findOne({
        where: { id: RoleEnum.PrimaryUser },
      });
      const user = this.userRepository.create(createUserDto);
      user.role = [role];
      user.password = await argon2.hash(user.password);
      const result = await this.userRepository.save(user);
      return plainToInstance(User, result);
    } catch (error) {
      throw new HttpException('用户已存在', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(query: QueryUser) {
    const { id, username, role, limit = 10, page = 1 } = query;
    const users = await this.userRepository.find({
      take: limit,
      skip: (page - 1) * limit,
      where: {
        id,
        username,
        role: {
          id: role,
        },
      },
      relations: {
        role: true,
      },
    });
    return plainToInstance(User, users);
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    return plainToInstance(User, user);
  }

  async findOneByUserNameAndShowPassword(username: string) {
    const result = await this.userRepository.findOne({
      where: { username },
      relations: {
        role: true,
      },
    });
    if (!result) {
      throw new NotFoundException('用户不存在');
    }
    return result;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const oldUser = await this.userRepository.findOne({ where: { id } });
    if (updateUserDto.password) {
      updateUserDto.password = await argon2.hash(updateUserDto.password);
    }
    const newUser = this.userRepository.merge(oldUser, updateUserDto);
    const result = await this.userRepository.save(newUser);
    return plainToInstance(User, result);
  }

  async remove(id: number) {
    const hasExist = await this.findOne(id);
    if (!hasExist) {
      throw new NotFoundException('用户不存在');
    }
    const result = await this.userRepository.delete(id);
    return result;
  }

  async updateUserAvatar(file: Express.Multer.File, id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw NotFoundException;
    }
    const { avatar } = user;
    const path = avatar.split(OSS_Config.url)[1];
    const ossUrl = await this.uploadService.upload(file, path);
    return await this.update(id, { avatar: ossUrl });
  }
}
