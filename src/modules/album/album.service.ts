import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { plainToInstance } from 'class-transformer'
import { Repository } from 'typeorm'
import { UploadsService } from '../alioss/upload.service'
import { Picture } from '../pictures/entities/picture.entity'
import { CreateAlbumDto } from './dto/create-album.dto'
import { Album } from './entities/album.entity'

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
    private readonly uploadService: UploadsService,
  ) {}
  // 新建专辑
  async create(
    file: Express.Multer.File,
    createAlbumDto: CreateAlbumDto,
    { id }: any,
  ) {
    const pic = await this.uploadService.upload(file)
    const album = this.albumRepository.create({
      // 创建相册实体对象
      title: createAlbumDto.title,
      description: createAlbumDto.description,
      pic,
      user: {
        id,
      }, // 关联用户信息
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

  async remove(id: number) {
    const result = await this.albumRepository.findOne({ where: { id } })
    try {
      return await this.albumRepository.remove(result)
    } catch (error) {
      throw new NotFoundException('资源不存在')
    }
  }
}
