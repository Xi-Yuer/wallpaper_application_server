import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { DB_Config } from 'src/config/db.config'
import { Album } from 'src/modules/album/entities/album.entity'
import { Banner } from 'src/modules/banner/entities/banner.entity'
import { Category } from 'src/modules/category/entities/category.entity'
import { Download } from 'src/modules/download/entities/download.entity'
import { Favor } from 'src/modules/favor/entities/favor.entity'
import { Picture } from 'src/modules/pictures/entities/picture.entity'
import { Role } from 'src/modules/roles/entities/role.entity'
import { Tag } from 'src/modules/tags/entities/tag.entity'
import { Upload } from 'src/modules/upload/entities/upload.entity'
import { User } from 'src/modules/users/entities/user.entity'

export const ConnectionParams: (
  ...args: any[]
) => Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions = async () => ({
  type: 'mysql',
  host: DB_Config.host,
  port: DB_Config.port,
  username: DB_Config.username,
  password: DB_Config.password,
  database: DB_Config.database,
  entities: [
    User,
    Role,
    Category,
    Tag,
    Picture,
    Album,
    Favor,
    Download,
    Banner,
    Upload,
  ],
  synchronize: false,
  logging: ['error'],
})
