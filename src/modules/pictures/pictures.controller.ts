import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFile,
  Query,
  ParseIntPipe,
} from '@nestjs/common'
import { PicturesService } from './pictures.service'
import { CreatePictureDto } from './dto/create-picture.dto'
import { JwtAuthGuard } from 'src/guard/jwt.guard'
import { FileUploadInterceptorFactory } from 'src/interceptor/file.interceptor'
import { QueryPictureDTO } from './dto/query-picture.dto'

@Controller('pictures')
export class PicturesController {
  constructor(private readonly picturesService: PicturesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileUploadInterceptorFactory())
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createPictureDto: CreatePictureDto,
    @Req() { user }: any,
  ) {
    return this.picturesService.create(createPictureDto, file, user)
  }

  @Get()
  findAll(@Query() queryPictureDTO: QueryPictureDTO) {
    return this.picturesService.findAll(queryPictureDTO)
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.picturesService.findOne(id)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.picturesService.remove(+id)
  }
}
