import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'

import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { QueryUser } from './dto/query-user.dto'
import { JwtAuthGuard } from 'src/guard/jwt.guard'
import { isAuthGuard } from 'src/guard/isAuth.guard'
import { IsAdmin } from 'src/guard/isAdmin.guard'
import { FileUploadInterceptorFactory } from 'src/interceptor/file.interceptor'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Get()
  @UseGuards(JwtAuthGuard, IsAdmin)
  findAll(@Query() query: QueryUser) {
    return this.usersService.findAll(query)
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id)
  }

  // 第一个守卫是判断当前用户是否携带 token 第二个守卫是拿到用户 id 与 修改的 id 进行判断是否一致，不一致则无法修改
  @UseGuards(JwtAuthGuard, isAuthGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, IsAdmin)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id)
  }

  @Post('avatar/:id')
  @UseGuards(JwtAuthGuard, isAuthGuard)
  @UseInterceptors(FileUploadInterceptorFactory())
  async updateAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: number,
  ) {
    return await this.usersService.updateUserAvatar(file, id)
  }
}
