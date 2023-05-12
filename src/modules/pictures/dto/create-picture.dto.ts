import { IsNotEmpty, IsOptional, Length } from 'class-validator'

export class CreatePictureDto {
  @IsOptional()
  @Length(2, 20)
  title: string

  @IsOptional()
  @IsOptional()
  @Length(2, 40)
  description: string

  @IsNotEmpty()
  category: number

  @IsNotEmpty()
  tag: number
}
