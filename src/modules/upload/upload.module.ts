import { Module } from '@nestjs/common'
import { UploadService } from './upload.service'
import { UploadController } from './upload.controller'
import { JwtService } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Upload } from './entities/upload.entity'
import { UploadModule as uploadModule } from '../alioss/upload.module'
import { Tag } from '../tags/entities/tag.entity'
import { Category } from '../category/entities/category.entity'
import { Picture } from '../pictures/entities/picture.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Upload, Tag, Category, Picture]),
    uploadModule,
  ],
  controllers: [UploadController],
  providers: [UploadService, JwtService],
})
export class UploadModule {}
