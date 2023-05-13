import { IsOptional } from 'class-validator'

export class QueryDownload {
  @IsOptional()
  limit?: number = 10

  @IsOptional()
  page?: number = 1
}
