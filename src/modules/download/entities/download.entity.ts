import { Picture } from 'src/modules/pictures/entities/picture.entity'
import { User } from 'src/modules/users/entities/user.entity'
import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Download {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToMany(() => Picture)
  @JoinTable()
  pic: Picture[]

  @ManyToMany(() => User)
  @JoinTable()
  user: User[]
}
