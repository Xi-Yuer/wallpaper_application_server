import { Album } from 'src/modules/album/entities/album.entity'
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
export class Picture {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ default: 'wallpaper_title' })
  title: string

  @Column({ default: 'this is a wallpaper description' })
  description: string

  @Column()
  pic: string

  @Column()
  hot: number

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

  @ManyToMany(() => Album)
  @JoinTable()
  album: Album[]

  @ManyToOne(() => User, (user) => user.picture)
  @JoinColumn({ name: 'userId' })
  user: User
}
