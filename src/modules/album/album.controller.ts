import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Req,
  ParseIntPipe,
} from '@nestjs/common'
import { IsAdmin } from 'src/guard/isAdmin.guard'
import { JwtAuthGuard } from 'src/guard/jwt.guard'
import { FileUploadInterceptorFactory } from 'src/interceptor/file.interceptor'
import { AlbumService } from './album.service'
import { CreateAlbumDto } from './dto/create-album.dto'
import { UpdateAlbumDto } from './dto/update-album.dto'

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @UseInterceptors(FileUploadInterceptorFactory())
  @UseGuards(JwtAuthGuard, IsAdmin)
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    return this.albumService.update(+id, updateAlbumDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.albumService.remove(+id)
  }
}
