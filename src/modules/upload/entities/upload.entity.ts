import { Category } from 'src/modules/category/entities/category.entity'
import { Tag } from 'src/modules/tags/entities/tag.entity'
import { User } from 'src/modules/users/entities/user.entity'
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class Upload {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  pic: string

  @Column()
  type: number

  @CreateDateColumn()
  createAt: Date
  @BeforeInsert()
  updateTimestamps() {
    this.createAt = new Date()
  }

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[]

  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[]

  @ManyToOne(() => User, (user) => user.picture)
  @JoinColumn({ name: 'userId' })
  user: User
}
