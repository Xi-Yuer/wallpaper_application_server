import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { plainToInstance } from 'class-transformer'
import { parseNumber } from 'src/utils/parse.number'
import { Repository } from 'typeorm'
import { Album } from '../album/entities/album.entity'
import { UploadsService } from '../alioss/upload.service'
import { Category } from '../category/entities/category.entity'
import { Tag } from '../tags/entities/tag.entity'
import { CreatePictureDto } from './dto/create-picture.dto'
import { QueryPictureDTO } from './dto/query-picture.dto'
import { Picture } from './entities/picture.entity'

@Injectable()
export class PicturesService {
  constructor(
    private readonly uploadService: UploadsService,
    @InjectRepository(Picture)
    private readonly pictureRepository: Repository<Picture>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
  ) {}

  // TODO:标题、描述、分类ID、标签ID、创建者、图片地址
  async create(
    createPictureDto: CreatePictureDto,
    file: Express.Multer.File,
    { id }: any,
  ) {
    const {
      title,
      description,
      category,
      tag,
      album: albumID,
    } = createPictureDto
    try {
      const pic = await this.uploadService.upload(file)
      const createTag = await this.tagRepository.find({
        where: {
          id: tag,
        },
      })
      const createCategory = await this.categoryRepository.find({
        where: {
          id: category,
        },
      })
      const album = await this.albumRepository.find({
        where: { id: albumID },
      })
      const picture = this.pictureRepository.create({
        title: title,
        description,
        pic,
        hot: 0,
        tags: createTag,
        categories: createCategory,
        album: album,
        user: {
          id,
        },
      })
      const result = await this.pictureRepository.save(picture)
      if (result) {
        return '上传成功'
      }
    } catch (error) {
      throw new HttpException('上传失败', HttpStatus.BAD_REQUEST)
    }
  }

  // 需要传入对应的 categoryID 或者 tagID
  async findAll(queryPictureDTO: QueryPictureDTO) {
    const { category, tag, limit = 10, page = 1 } = queryPictureDTO
    const take = parseNumber(limit, 10)
    const skip = (parseNumber(page, 1) - 1) * take
    const result = await this.pictureRepository.find({
      where: {
        tags: {
          id: tag,
        },
        categories: {
          id: category,
        },
      },
      relations: {
        categories: true,
        tags: true,
        album: true,
        user: true,
      },
      take,
      skip,
    })
    return plainToInstance(Picture, result)
  }

  // 获取单张图片资源详细信息
  async findOne(id: number) {
    const result = await this.pictureRepository.find({
      where: {
        id,
      },
      relations: {
        categories: true,
        tags: true,
        user: true,
      },
    })
    return plainToInstance(Picture, result)
  }

  // 获取用户上传的所有图片

  async findUserPictureByID(id: number) {
    const result = await this.pictureRepository.find({
      where: {
        user: {
          id,
        },
      },
    })
    return plainToInstance(Picture, result)
  }

  async remove(id: number, { id: userId }: any) {
    const result = await this.pictureRepository.find({
      where: {
        id,
        user: {
          id: userId,
        },
      },
    })
    return await this.pictureRepository.delete(result[0].id)
  }
}
