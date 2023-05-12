import { Type } from 'class-transformer'
import { IsNumber, IsOptional, Min } from 'class-validator'

export class QueryTagDTO {
  @IsOptional()
  tagName?: string

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  categoryId?: number

  @IsOptional()
  @Type(() => Number)
  @Min(1)
  limit?: number

  @IsOptional()
  @Type(() => Number)
  @Min(1)
  page?: number
}
