import { Module } from '@nestjs/common'
import { BannerService } from './banner.service'
import { BannerController } from './banner.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Banner } from './entities/banner.entity'
import { JwtService } from '@nestjs/jwt'
import { UploadModule } from '../alioss/upload.module'

@Module({
  imports: [TypeOrmModule.forFeature([Banner]), UploadModule],
  controllers: [BannerController],
  providers: [BannerService, JwtService],
})
export class BannerModule {}
