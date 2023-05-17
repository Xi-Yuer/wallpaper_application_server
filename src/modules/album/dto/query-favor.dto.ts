import { IsOptional } from 'class-validator'

export class QueryAlbum {
  @IsOptional()
  limit?: number = 10

  @IsOptional()
  page?: number = 1
}
