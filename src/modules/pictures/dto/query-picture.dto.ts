import { Type } from 'class-transformer'
import { IsNumber, IsOptional, Min } from 'class-validator'

export class QueryPictureDTO {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  category: number

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  tag: number

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  limit: number

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  page: number
}
