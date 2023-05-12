import { Tag } from 'src/modules/tags/entities/tag.entity'
import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  pic: string

  // 一个分类底下有多个 tag
  @OneToMany(() => Tag, (tag) => tag.category)
  @JoinTable()
  tags: Tag[]
}
