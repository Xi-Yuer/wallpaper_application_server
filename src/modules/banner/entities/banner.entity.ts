import { Album } from 'src/modules/album/entities/album.entity'
import { Tag } from 'src/modules/tags/entities/tag.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Banner {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  pic: string

  @Column()
  type: 'album' | 'tag'

  @Column({ nullable: true })
  albumId: number

  @ManyToOne(() => Album, (album) => album.banner, { nullable: true })
  album: Album

  @Column({ nullable: true })
  tagId: number

  @ManyToOne(() => Tag, (tag) => tag.banner, { nullable: true })
  tag: Tag
}
