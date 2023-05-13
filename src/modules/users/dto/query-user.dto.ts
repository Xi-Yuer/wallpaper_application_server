import { Type } from 'class-transformer'
import { IsOptional, IsString, Min } from 'class-validator'

export class QueryUser {
  @IsString()
  @IsOptional()
  id: number

  @IsString()
  @IsOptional()
  username: string

  @IsOptional()
  @Type(() => Number)
  @Min(1)
  limit?: number = 10

  @IsOptional()
  @Type(() => Number)
  @Min(1)
  page?: number = 1

  @IsOptional()
  role: number
}
