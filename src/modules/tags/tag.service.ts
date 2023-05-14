import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { parseNumber } from 'src/utils/parse.number'
import { Like, Repository } from 'typeorm'
import { UploadsService } from '../alioss/upload.service'
import { CategoryService } from '../category/category.service'
import { CreateTagDto } from './dto/create-tag.dto'
import { QueryTagDTO } from './dto/query-tag.dto'
import { Tag } from './entities/tag.entity'

@Injectable()
export class TagService {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly uploadService: UploadsService,
    @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
  ) {}
  async create(file: Express.Multer.File, createTagDto: CreateTagDto) {
    const { categoryId } = createTagDto
    const isExist = await this.categoryService.findOne(categoryId)
    if (!isExist) {
      throw new NotFoundException()
    }
    const ossUrl = await this.uploadService.upload(file)
    const tag = this.tagRepository.create({
      tagName: createTagDto.tagName,
      pic: ossUrl,
      category: {
        id: categoryId,
      },
    })
    return await this.tagRepository.save(tag)
  }

  async findAll(queryTagDto: QueryTagDTO) {
    const { limit = 10, page = 1, tagName = '', categoryId } = queryTagDto
    const take = parseNumber(limit, 10)
    const skip = (parseNumber(page, 1) - 1) * take
    return await this.tagRepository.find({
      where: {
        tagName: Like(`%${tagName}%`),
        category: {
          id: categoryId,
        },
      },
      take,
      skip,
      relations: {
        category: true,
      },
    })
  }

  async remove(id: number) {
    const result = await this.tagRepository.findOne({ where: { id } })
    if (!result) {
      throw new NotFoundException()
    }
    await this.uploadService.delete(result.pic)
    return await this.tagRepository.delete(id)
  }
}
