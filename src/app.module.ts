import { Module } from '@nestjs/common'
import { APP_FILTER } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConnectionParams } from './connection/mysql.connection'
import { HttpExceptionFilter } from './filter/global.error.filter'
import { UsersModule } from './modules/users/users.module'
import { AuthModule } from './modules/auth/auth.module'
import { CategoryModule } from './modules/category/category.module'
import { TagModule } from './modules/tags/tag.module'
import { PicturesModule } from './modules/pictures/pictures.module'
import { SearchModule } from './modules/search/search.module'
import { FavorModule } from './modules/favor/favor.module'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: ConnectionParams,
    }),
    AuthModule,
    UsersModule,
    CategoryModule,
    TagModule,
    PicturesModule,
    SearchModule,
    FavorModule,
  ],
  controllers: [],
  providers: [
    // 全局异常拦截器
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
