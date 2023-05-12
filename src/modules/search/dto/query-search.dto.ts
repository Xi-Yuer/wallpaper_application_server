import { Type } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator'

export class QuerySearchDTO {
  @IsString()
  @IsNotEmpty()
  searchKey: string

  @IsNumber()
  @Type(() => Number)
  @Min(1)
  limit: number

  @IsNumber()
  @Type(() => Number)
  @Min(1)
  page: number
}
