import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Req,
  Query,
} from '@nestjs/common'
import { JwtAuthGuard } from 'src/guard/jwt.guard'
import { DownloadService } from './download.service'
import { QueryDownload } from './dto/query-download.dto'

@Controller('download')
@UseGuards(JwtAuthGuard)
export class DownloadController {
  constructor(private readonly downloadService: DownloadService) {}

  @Post(':id')
  create(
    @Param('id', ParseIntPipe) createDownloadDto: number,
    @Req() { user }: any,
  ) {
    return this.downloadService.create(createDownloadDto, user)
  }

  @Get()
  findAll(@Req() { user }: any, @Query() queryDownload: QueryDownload) {
    return this.downloadService.findAll(user, queryDownload)
  }
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Req() { user }: any) {
    return this.downloadService.remove(id, user)
  }
}
