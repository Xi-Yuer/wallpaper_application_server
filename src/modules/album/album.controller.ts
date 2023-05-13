import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Req,
  ParseIntPipe,
} from '@nestjs/common'
import { isAuthGuard } from 'src/guard/isAuth.guard'
import { JwtAuthGuard } from 'src/guard/jwt.guard'
import { FileUploadInterceptorFactory } from 'src/interceptor/file.interceptor'
import { AlbumService } from './album.service'
import { CreateAlbumDto } from './dto/create-album.dto'

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @UseInterceptors(FileUploadInterceptorFactory())
  @UseGuards(JwtAuthGuard)
  create(
    @UploadedFile('file') file: Express.Multer.File,
    @Body() createAlbumDto: CreateAlbumDto,
    @Req() { user }: any,
  ) {
    return this.albumService.create(file, createAlbumDto, user)
  }

  @Get()
  findAll() {
    return this.albumService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.albumService.findOne(id)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, isAuthGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.albumService.remove(id)
  }
}
