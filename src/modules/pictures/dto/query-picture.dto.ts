import { Type } from 'class-transformer'
import { IsNumber, IsOptional } from 'class-validator'

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
  album: number

  @IsOptional()
  limit: number

  @IsOptional()
  page: number
}
