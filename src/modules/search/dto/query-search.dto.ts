import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class QuerySearchDTO {
  @IsString()
  @IsNotEmpty()
  searchKey: string

  @IsOptional()
  limit: number

  @IsOptional()
  page: number
}
