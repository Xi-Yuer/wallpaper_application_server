import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Favor } from './entities/favor.entity'

@Injectable()
export class FavorService {
  constructor(
    @InjectRepository(Favor)
    private readonly favorRepository: Repository<Favor>,
  ) {}
  // 加入收藏
  async create(picID: number, { id }: any) {
    try {
      const hasFavor = await this.favorRepository.find({
        where: {
          user: {
            id: id,
          },
          pic: {
            id: picID,
          },
        },
      })
      if (hasFavor.length) return '切勿重复收藏'
      const result = this.favorRepository.create({
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

      const res = await this.favorRepository.save(result)
      if (res) {
        return '已加入收藏'
      }
    } catch (error) {
      throw new NotFoundException('资源不存在')
    }
  }

  async findAll({ id }: any) {
    return await this.favorRepository.find({
      where: {
        user: {
          id,
        },
      },
      relations: {
        pic: true,
      },
    })
  }

  // 移除收藏
  async remove(id: number, { id: userID }) {
    const [result] = await this.favorRepository.find({
      where: {
        user: {
          id: userID,
        },
        pic: {
          id,
        },
      },
    })
    return this.favorRepository.delete(result.id)
  }
}
