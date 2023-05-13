import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator'

export class CreatePictureDto {
  @IsOptional()
  @Length(2, 20)
  title: string

  @IsOptional()
  @IsOptional()
  @Length(2, 40)
  description: string

  @IsNotEmpty()
  @IsOptional()
  category: number

  @IsNotEmpty()
  @IsOptional()
  tag: number

  @IsOptional()
  @IsString()
  @IsOptional()
  album: number
}
