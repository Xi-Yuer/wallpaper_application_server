import { Category } from 'src/modules/category/entities/category.entity'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  tagName: string

  @Column()
  pic: string

  // 多个 tag 对应一个分类
  @ManyToOne(() => Category, (category) => category.tags)
  @JoinColumn()
  category: Category
}
