import { Module } from '@nestjs/common'
import { AlbumService } from './album.service'
import { AlbumController } from './album.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Album } from './entities/album.entity'
import { JwtService } from '@nestjs/jwt'
import { UploadModule } from '../alioss/upload.module'

@Module({
  imports: [TypeOrmModule.forFeature([Album]), UploadModule],
  controllers: [AlbumController],
  providers: [AlbumService, JwtService],
})
export class AlbumModule {}
