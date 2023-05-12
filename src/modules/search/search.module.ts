import { Module } from '@nestjs/common'
import { SearchService } from './search.service'
import { SearchController } from './search.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Picture } from '../pictures/entities/picture.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Picture])],
  providers: [SearchService],
  controllers: [SearchController],
})
export class SearchModule {}
