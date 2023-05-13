import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { plainToInstance } from 'class-transformer'
import * as argon2 from 'argon2'
import { Like, Repository } from 'typeorm'
import { Role } from '../roles/entities/role.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import { QueryUser } from './dto/query-user.dto'
import { RoleEnum } from 'src/enum/role.enum'
import { UploadsService } from '../alioss/upload.service'
import { OSS_Config } from 'src/config/oss.config'
import { parseNumber } from 'src/utils/parse.number'

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
      })
      const user = this.userRepository.create(createUserDto)
      user.role = [role]
      user.password = await argon2.hash(user.password)
      const result = await this.userRepository.save(user)
      return plainToInstance(User, result)
    } catch (error) {
      throw new HttpException('用户已存在', HttpStatus.BAD_REQUEST)
    }
  }

  async findAll(query: QueryUser) {
    const { id, username = '', role, limit = 10, page = 1 } = query
    const take = parseNumber(limit, 10)
    const skip = (parseNumber(page, 1) - 1) * take
    const users = await this.userRepository.find({
      where: {
        id,
        username: Like(`%${username}%`),
        role: { id: role },
      },
      relations: {
        role: true,
      },
      take,
      skip,
    })
    return plainToInstance(User, users)
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id } })
    return plainToInstance(User, user)
  }

  async findOneByUserNameAndShowPassword(username: string) {
    const result = await this.userRepository.findOne({
      where: { username },
      relations: {
        role: true,
      },
    })
    if (!result) {
      throw new NotFoundException('用户不存在')
    }
    return result
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const oldUser = await this.userRepository.findOne({ where: { id } })
    if (updateUserDto.password) {
      updateUserDto.password = await argon2.hash(updateUserDto.password)
    }
    const newUser = this.userRepository.merge(oldUser, updateUserDto)
    const result = await this.userRepository.save(newUser)
    return plainToInstance(User, result)
  }

  async remove(id: number) {
    const user = await this.findOne(id)
    if (!user) {
      throw new NotFoundException('用户不存在')
    }
    const { avatar } = user
    // 删除用户头像
    const path = avatar.split(OSS_Config.url)[1]
    this.uploadService.delete(path)
    const result = await this.userRepository.delete(id)
    return result
  }

  async updateUserAvatar(file: Express.Multer.File, id: number) {
    const user = await this.findOne(id)
    if (!user) {
      throw new NotFoundException('更新失败')
    }
    const { avatar } = user
    const path = avatar.split(OSS_Config.url)[1]
    const ossUrl = await this.uploadService.upload(file, path)
    return await this.update(id, { avatar: ossUrl })
  }
}
