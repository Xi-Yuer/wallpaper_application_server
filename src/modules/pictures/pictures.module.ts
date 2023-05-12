import { Module } from '@nestjs/common'
import { PicturesService } from './pictures.service'
import { PicturesController } from './pictures.controller'
import { JwtService } from '@nestjs/jwt'
import { UploadModule } from '../alioss/upload.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Picture } from './entities/picture.entity'
import { Category } from '../category/entities/category.entity'
import { Tag } from '../tags/entities/tag.entity'

@Module({
  imports: [UploadModule, TypeOrmModule.forFeature([Picture, Category, Tag])],
  controllers: [PicturesController],
  providers: [PicturesService, JwtService],
})
export class PicturesModule {}