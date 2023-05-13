import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseGuards,
  Req,
  ParseIntPipe,
  Query,
} from '@nestjs/common'
import { FavorService } from './favor.service'
import { JwtAuthGuard } from 'src/guard/jwt.guard'
import { QueryFavor } from './dto/query-favor.dto'

@Controller('favor')
@UseGuards(JwtAuthGuard)
export class FavorController {
  constructor(private readonly favorService: FavorService) {}

  @Post(':id')
  create(
    @Param('id', ParseIntPipe) createFavorDto: number,
    @Req() { user }: any,
  ) {
    return this.favorService.create(createFavorDto, user)
  }

  @Get()
  findAll(@Req() { user }: any, @Query() query: QueryFavor) {
    return this.favorService.findAll(user, query)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Req() { user }: any) {
    return this.favorService.remove(id, user)
  }
}
