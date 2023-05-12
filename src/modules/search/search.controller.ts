import { Controller, Get, Query } from '@nestjs/common'
import { QuerySearchDTO } from './dto/query-search.dto'
import { SearchService } from './search.service'

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}
  @Get()
  async find(@Query() querySearchDTO: QuerySearchDTO) {
    return this.searchService.find(querySearchDTO)
  }
}
