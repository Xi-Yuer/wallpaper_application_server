import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseGuards,
  Req,
  ParseIntPipe,
} from '@nestjs/common'
import { FavorService } from './favor.service'
import { JwtAuthGuard } from 'src/guard/jwt.guard'

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
  findAll(@Req() { user }: any) {
    return this.favorService.findAll(user)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Req() { user }: any) {
    return this.favorService.remove(id, user)
  }
}
