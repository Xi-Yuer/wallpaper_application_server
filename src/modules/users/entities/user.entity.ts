import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Exclude } from 'class-transformer'
import { Role } from 'src/modules/roles/entities/role.entity'
import { Picture } from 'src/modules/pictures/entities/picture.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  username: string

  @Column()
  @Exclude()
  password: string

  @Column({ default: 'default.jpg' })
  avatar: string

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable()
  role: Role[]

  @OneToMany(() => Picture, (picture) => picture.user)
  picture: Picture[]
}
