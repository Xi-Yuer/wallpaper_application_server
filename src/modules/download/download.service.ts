import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { parseNumber } from 'src/utils/parse.number'
import { Repository } from 'typeorm'
import { QueryDownload } from './dto/query-download.dto'
import { Download } from './entities/download.entity'

@Injectable()
export class DownloadService {
  constructor(
    @InjectRepository(Download)
    private readonly dowloadRepository: Repository<Download>,
  ) {}
  async create(picID: number, { id }: any) {
    try {
      const hasDownload = await this.dowloadRepository.find({
        where: {
          user: {
            id: id,
          },
          pic: {
            id: picID,
          },
        },
      })
      // 用户之前下载过该资源
      if (hasDownload.length) return '下载成功'
      const result = this.dowloadRepository.create({
        pic: [
          {
            id: picID,
          },
        ],
        user: [
          {
            id,
          },
        ],
      })

      const res = await this.dowloadRepository.save(result)
      if (res) {
        return '已下载'
      }
    } catch (error) {
      throw new NotFoundException('资源不存在')
    }
  }

  async findAll({ id }: any, queryDownload: QueryDownload) {
    const { limit = 10, page = 1 } = queryDownload
    const take = parseNumber(limit, 10)
    const skip = (parseNumber(page, 1) - 1) * take
    return await this.dowloadRepository.find({
      where: {
        user: {
          id,
        },
      },
      relations: {
        pic: true,
      },
      take,
      skip,
    })
  }

  async remove(id: number, { id: userID }) {
    const [result] = await this.dowloadRepository.find({
      where: {
        user: {
          id: userID,
        },
        pic: {
          id,
        },
      },
    })
    return this.dowloadRepository.delete(result.id)
  }
}
