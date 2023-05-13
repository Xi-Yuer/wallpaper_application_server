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
  ParseIntPipe,
} from '@nestjs/common'
import { IsAdmin } from 'src/guard/isAdmin.guard'
import { JwtAuthGuard } from 'src/guard/jwt.guard'
import { FileUploadInterceptorFactory } from 'src/interceptor/file.interceptor'
import { BannerService } from './banner.service'
import { CreateBannerDto } from './dto/create-banner.dto'

@Controller('banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Post()
  @UseInterceptors(FileUploadInterceptorFactory())
  @UseGuards(JwtAuthGuard, IsAdmin)
  create(
    @UploadedFile('file') file: Express.Multer.File,
    @Body() createBannerDto: CreateBannerDto,
  ) {
    return this.bannerService.create(file, createBannerDto)
  }

  @Get()
  findAll() {
    return this.bannerService.findAll()
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, IsAdmin)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.bannerService.remove(id)
  }
}
