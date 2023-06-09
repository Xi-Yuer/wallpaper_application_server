import { Banner } from 'src/modules/banner/entities/banner.entity'
import { Category } from 'src/modules/category/entities/category.entity'
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
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

  @ManyToMany(() => Banner)
  @JoinTable()
  banner: Banner[]
}
