import { Module } from '@nestjs/common'
import { TagService } from './tag.service'
import { TagController } from './tag.controller'
import { CategoryModule } from '../category/category.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Tag } from './entities/tag.entity'
import { JwtService } from '@nestjs/jwt'
import { UploadModule } from '../alioss/upload.module'

@Module({
  imports: [TypeOrmModule.forFeature([Tag]), CategoryModule, UploadModule],
  controllers: [TagController],
  providers: [TagService, JwtService],
})
export class TagModule {}
