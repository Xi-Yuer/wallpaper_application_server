import { Type } from 'class-transformer'
import { IsNumber, IsOptional } from 'class-validator'

export class QueryTagDTO {
  @IsOptional()
  tagName?: string

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  categoryId?: number

  @IsOptional()
  limit?: number

  @IsOptional()
  page?: number
}
