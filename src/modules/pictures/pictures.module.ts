import { Module } from '@nestjs/common'
import { PicturesService } from './pictures.service'
import { PicturesController } from './pictures.controller'
import { JwtService } from '@nestjs/jwt'
import { UploadModule } from '../alioss/upload.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Picture } from './entities/picture.entity'
import { Category } from '../category/entities/category.entity'
import { Tag } from '../tags/entities/tag.entity'
import { User } from '../users/entities/user.entity'
import { Album } from '../album/entities/album.entity'

@Module({
  imports: [
    UploadModule,
    TypeOrmModule.forFeature([User, Picture, Category, Tag, Album]),
  ],
  controllers: [PicturesController],
  providers: [PicturesService, JwtService],
})
export class PicturesModule {}
