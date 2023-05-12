import { Picture } from 'src/modules/pictures/entities/picture.entity'
import { User } from 'src/modules/users/entities/user.entity'
import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'

// 收藏的壁纸
@Entity()
export class Favor {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToMany(() => Picture)
  @JoinTable()
  pic: Picture[]

  @ManyToMany(() => User)
  @JoinTable()
  user: User[]
}
