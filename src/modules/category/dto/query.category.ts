import { Type } from 'class-transformer'
import { IsOptional, Min } from 'class-validator'

export class QueryCategoryDTO {
  @IsOptional()
  name: string

  @IsOptional()
  @Min(0)
  @Type(() => Number)
  limit: number

  @IsOptional()
  @Min(1)
  @Type(() => Number)
  page: number
}
