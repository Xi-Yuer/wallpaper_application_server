import { Banner } from 'src/modules/banner/entities/banner.entity'
import { Picture } from 'src/modules/pictures/entities/picture.entity'
import { User } from 'src/modules/users/entities/user.entity'
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class Album {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  description: string

  @Column()
  pic: string

  @CreateDateColumn()
  createAt: Date
  @BeforeInsert()
  updateTimestamps() {
    this.createAt = new Date()
  }

  @OneToMany(() => Picture, (picture) => picture.album)
  @JoinTable()
  picture: Picture[]

  @ManyToOne(() => User, (user) => user.album)
  @JoinTable()
  user: User

  @ManyToMany(() => Banner)
  @JoinTable()
  banner: Banner[]
}
