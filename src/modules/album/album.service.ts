import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { plainToInstance } from 'class-transformer'
import { Repository } from 'typeorm'
import { UploadsService } from '../alioss/upload.service'
import { Picture } from '../pictures/entities/picture.entity'
import { User } from '../users/entities/user.entity'
import { CreateAlbumDto } from './dto/create-album.dto'
import { UpdateAlbumDto } from './dto/update-album.dto'
import { Album } from './entities/album.entity'

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly uploadService: UploadsService,
  ) {}
  // 新建专辑
  async create(
    file: Express.Multer.File,
    createAlbumDto: CreateAlbumDto,
    { id }: any,
  ) {
    const pic = await this.uploadService.upload(file)
    const user = await this.userRepository.find({ where: { id } }) // 查询用户信息
    const album = this.albumRepository.create({
      // 创建相册实体对象
      title: createAlbumDto.title,
      description: createAlbumDto.description,
      pic,
      user: user[0], // 关联用户信息
    })
    const res = await this.albumRepository.save(album) // 保存相册信息

    return plainToInstance(Picture, res)
  }

  findAll() {
    return this.albumRepository.find()
  }

  async findOne(id: number) {
    return await this.albumRepository.find({
      where: {
        id,
      },
      relations: {
        picture: true,
      },
    })
  }

  update(id: number, updateAlbumDto: UpdateAlbumDto) {
    return `This action updates a #${id} album`
  }

  remove(id: number) {
    return `This action removes a #${id} album`
  }
}
