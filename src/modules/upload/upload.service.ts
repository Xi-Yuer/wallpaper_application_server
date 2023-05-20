import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { plainToInstance } from 'class-transformer'
import { Repository } from 'typeorm'
import { UploadsService } from '../alioss/upload.service'
import { Category } from '../category/entities/category.entity'
import { Picture } from '../pictures/entities/picture.entity'
import { Tag } from '../tags/entities/tag.entity'
import { CreateUploadDto } from './dto/create-upload.dto'
import { Upload } from './entities/upload.entity'

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(Upload)
    private readonly uploadReposity: Repository<Upload>,
    @InjectRepository(Tag)
    private readonly tagReposity: Repository<Tag>,
    @InjectRepository(Category)
    private readonly categoryReposity: Repository<Category>,
    @InjectRepository(Picture)
    private readonly pictureReposity: Repository<Picture>,

    private readonly uploadsService: UploadsService,
  ) {}
  async create(
    createUploadDto: CreateUploadDto,
    file: Express.Multer.File,
    { id }: any,
  ) {
    const { category, tag } = createUploadDto
    const tagResult = this.tagReposity.create({ id: tag })
    const categoryResult = this.categoryReposity.create({ id: category })

    const pic = await this.uploadsService.upload(file)
    const result = await this.uploadReposity.create({
      tags: [tagResult],
      categories: [categoryResult],
      user: {
        id,
      },
      type: 0,
      pic,
    })
    return await this.uploadReposity.save(result)
  }

  async findAll(type: number) {
    const result = await this.uploadReposity.find({
      where: {
        type,
      },
      relations: {
        user: true,
      },
    })
    return plainToInstance(Upload, result)
  }

  async findOne(id: number, type: number) {
    return await this.uploadReposity.find({
      where: {
        user: {
          id,
        },
        type,
      },
    })
  }

  async update(id: number, type: number) {
    const result = await this.uploadReposity.findOne({
      where: {
        id,
      },
    })
    const mergeResult = await this.uploadReposity.merge(result, { type })
    if (type == 1) {
      // 审核通过，将图片添加到数据库中
      const picture = this.pictureReposity.create({
        title: '用户上传',
        description: '',
        pic: mergeResult.pic,
        hot: 0,
        tags: mergeResult.tags,
        categories: mergeResult.categories,
        user: {
          id: 0,
        },
      })
      await this.pictureReposity.save(picture)
    }
    return this.uploadReposity.save(mergeResult)
  }
}
