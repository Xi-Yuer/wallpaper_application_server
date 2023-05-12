import { IsOptional } from 'class-validator'

export class QueryCategoryDTO {
  @IsOptional()
  name: string

  @IsOptional()
  limit: number
  
  @IsOptional()
  page: number
}
