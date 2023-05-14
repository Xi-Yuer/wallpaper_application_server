import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UploadsService } from '../alioss/upload.service'
import { CreateBannerDto } from './dto/create-banner.dto'
import { Banner } from './entities/banner.entity'

@Injectable()
export class BannerService {
  constructor(
    @InjectRepository(Banner)
    private readonly bannerRepository: Repository<Banner>,

    private readonly uploadService: UploadsService,
  ) {}
  async create(file: Express.Multer.File, createBannerDto: CreateBannerDto) {
    const { type, albumId, tagId } = createBannerDto
    const pic = await this.uploadService.upload(file)

    let createSchema
    if (type === 'album') {
      createSchema = {
        pic,
        type: type,
        album: {
          id: albumId,
        },
      }
    } else {
      createSchema = {
        pic,
        type: type,
        tag: {
          id: tagId,
        },
      }
    }
    const result = this.bannerRepository.create(createSchema)
    return await this.bannerRepository.save(result)
  }

  async findAll() {
    return await this.bannerRepository.find()
  }

  async remove(id: number) {
    const result = await this.bannerRepository.find({ where: { id } })
    this.uploadService.delete(result[0].pic)
    return await this.bannerRepository.remove(result)
  }
}
