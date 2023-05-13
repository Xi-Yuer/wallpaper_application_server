import { IsOptional } from 'class-validator'

export class QueryFavor {
  @IsOptional()
  limit?: number = 10

  @IsOptional()
  page?: number = 1
}
