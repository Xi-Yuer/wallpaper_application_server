import { Type } from 'class-transformer'
import { IsNumber, IsOptional, Min } from 'class-validator'

export class QueryDownload {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  limit?: number = 10

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  page?: number = 1
}
