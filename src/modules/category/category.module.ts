import { Module } from '@nestjs/common'
import { CategoryService } from './category.service'
import { CategoryController } from './category.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Category } from './entities/category.entity'
import { UploadModule } from '../alioss/upload.module'
import { JwtService } from '@nestjs/jwt'

@Module({
  imports: [TypeOrmModule.forFeature([Category]), UploadModule],
  controllers: [CategoryController],
  providers: [CategoryService, JwtService],
  exports: [CategoryService],
})
export class CategoryModule {}
