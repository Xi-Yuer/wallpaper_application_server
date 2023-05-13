import { IsOptional, IsString } from 'class-validator'

export class CreateBannerDto {
  @IsString()
  @IsOptional()
  type: 'album' | 'tag'

  @IsOptional()
  albumId: number

  @IsOptional()
  tagId: number
}
