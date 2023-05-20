import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common'
import { UploadService } from './upload.service'
import { CreateUploadDto } from './dto/create-upload.dto'
import { JwtAuthGuard } from 'src/guard/jwt.guard'
import { FileUploadInterceptorFactory } from 'src/interceptor/file.interceptor'
import { IsAdmin } from 'src/guard/isAdmin.guard'

@Controller('upload')
@UseGuards(JwtAuthGuard)
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileUploadInterceptorFactory())
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createUploadDto: CreateUploadDto,
    @Req() { user }: any,
  ) {
    return this.uploadService.create(createUploadDto, file, user)
  }

  @Get('all')
  @UseGuards(JwtAuthGuard, IsAdmin)
  findAll(@Query('type') type: number) {
    return this.uploadService.findAll(type)
  }

  @Get(':id')
  findOne(@Param('id') id: number, @Query('type') type: number) {
    return this.uploadService.findOne(id, type)
  }

  @Post(':id')
  @UseGuards(IsAdmin)
  update(@Param('id') id: number, @Query('type') type: number) {
    return this.uploadService.update(id, type)
  }
}
