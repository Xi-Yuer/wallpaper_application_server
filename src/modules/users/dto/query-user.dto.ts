import { IsOptional, IsString } from 'class-validator'

export class QueryUser {
  @IsString()
  @IsOptional()
  id: number

  @IsString()
  @IsOptional()
  username: string

  @IsOptional()
  limit?: number = 10

  @IsOptional()
  page?: number = 1

  @IsOptional()
  role: number
}
