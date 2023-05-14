import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { plainToInstance } from 'class-transformer'
import { parseNumber } from 'src/utils/parse.number'
import { Like, Repository } from 'typeorm'
import { Picture } from '../pictures/entities/picture.entity'
import { QuerySearchDTO } from './dto/query-search.dto'

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(Picture)
    private readonly pictureRespository: Repository<Picture>,
  ) {}
  async find(querySearchDTO: QuerySearchDTO) {
    const { searchKey, limit = 10, page = 1 } = querySearchDTO
    const take = parseNumber(limit, 10)
    const skip = (parseNumber(page, 1) - 1) * take
    const result = await this.pictureRespository.find({
      where: [
        { title: Like(`%${searchKey}%`) },
        { description: Like(`%${searchKey}%`) },
        {
          categories: {
            name: Like(`%${searchKey}%`),
          },
        },
        {
          tags: {
            tagName: Like(`%${searchKey}%`),
          },
        },
      ],
      relations: {
        categories: true,
        tags: true,
        user: true,
      },
      take,
      skip,
    })
    return plainToInstance(Picture, result)
  }
}
