import { IsOptional } from 'class-validator'

export class QueryTagDTO {
  @IsOptional()
  tagName?: string

  @IsOptional()
  categoryId?: number

  @IsOptional()
  limit?: number

  @IsOptional()
  page?: number
}
