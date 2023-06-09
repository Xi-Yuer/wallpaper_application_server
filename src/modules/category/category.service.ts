import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { parseNumber } from 'src/utils/parse.number'
import { Like, Repository } from 'typeorm'
import { UploadsService } from '../alioss/upload.service'
import { CreateCategoryDTO } from './dto/create.category'
import { QueryCategoryDTO } from './dto/query.category'
import { Category } from './entities/category.entity'

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly uploadService: UploadsService,
  ) {}

  async find(queryCategoryDTO: QueryCategoryDTO) {
    const { name = '', limit = 10, page = 1 } = queryCategoryDTO
    const take = parseNumber(limit, 10)
    const skip = (parseNumber(page, 1) - 1) * take
    return await this.categoryRepository.find({
      where: {
        name: Like(`%${name}%`),
      },
      relations: {
        tags: true,
      },
      take,
      skip,
    })
  }

  async findOne(id: number) {
    return await this.categoryRepository.findOne({ where: { id } })
  }

  async create(file: Express.Multer.File, name: CreateCategoryDTO) {
    const ossUrl = await this.uploadService.upload(file)
    const result = this.categoryRepository.create({ ...name, pic: ossUrl })

    if (ossUrl && result) {
      return await this.categoryRepository.save(result)
    }
  }

  async delete(categoryID: number) {
    try {
      const result = await this.categoryRepository.findOne({
        where: { id: categoryID },
      })
      if (!result) {
        throw new NotFoundException()
      }
      this.uploadService.delete(result.pic)
      return await this.categoryRepository.delete(categoryID)
    } catch (error) {
      throw new HttpException('删除失败', HttpStatus.BAD_REQUEST)
    }
  }
}
