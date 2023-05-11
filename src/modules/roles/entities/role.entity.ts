import { User } from 'src/modules/users/entities/user.entity'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string
  @Column()
  permission: string

  @ManyToMany(() => User, (user) => user.role)
  @JoinColumn()
  users: User[]
}
