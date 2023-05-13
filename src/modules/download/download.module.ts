import { Module } from '@nestjs/common'
import { DownloadService } from './download.service'
import { DownloadController } from './download.controller'
import { JwtService } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Download } from './entities/download.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Download])],
  controllers: [DownloadController],
  providers: [DownloadService, JwtService],
})
export class DownloadModule {}
