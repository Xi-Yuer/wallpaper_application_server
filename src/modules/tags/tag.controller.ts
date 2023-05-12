import {
  Controller,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Delete,
  Param,
  ParseIntPipe,
  Get,
  Query,
} from '@nestjs/common'
import { TagService } from './tag.service'
import { CreateTagDto } from './dto/create-tag.dto'
import { JwtAuthGuard } from 'src/guard/jwt.guard'
import { IsAdmin } from 'src/guard/isAdmin.guard'
import { FileUploadInterceptorFactory } from 'src/interceptor/file.interceptor'
import { QueryTagDTO } from './dto/query-tag.dto'

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  @Post()
  @UseGuards(JwtAuthGuard, IsAdmin)
  @UseInterceptors(FileUploadInterceptorFactory())
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createTagDto: CreateTagDto,
  ) {
    return this.tagService.create(file, createTagDto)
  }

  @Get()
  find(@Query() queryTagDta: QueryTagDTO) {
    return this.tagService.findAll(queryTagDta)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, IsAdmin)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tagService.remove(id)
  }
}
