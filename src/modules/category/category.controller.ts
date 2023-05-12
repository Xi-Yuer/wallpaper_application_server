import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { IsAdmin } from 'src/guard/isAdmin.guard'
import { JwtAuthGuard } from 'src/guard/jwt.guard'
import { FileUploadInterceptorFactory } from 'src/interceptor/file.interceptor'
import { CategoryService } from './category.service'
import { CreateCategoryDTO } from './dto/create.category'
import { QueryCategoryDTO } from './dto/query.category'

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async find(@Query() queryCategoryDTO: QueryCategoryDTO) {
    return await this.categoryService.find(queryCategoryDTO)
  }

  @Post()
  @UseGuards(JwtAuthGuard, IsAdmin)
  @UseInterceptors(FileUploadInterceptorFactory())
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() name: CreateCategoryDTO,
  ) {
    return await this.categoryService.create(file, name)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, IsAdmin)
  async delete(@Param('id') id: number) {
    return await this.categoryService.delete(id)
  }
}
