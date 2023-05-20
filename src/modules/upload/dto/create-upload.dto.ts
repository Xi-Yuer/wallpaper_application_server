import { IsNotEmpty, IsOptional } from 'class-validator'

export class CreateUploadDto {
  @IsNotEmpty()
  @IsOptional()
  category: number

  @IsNotEmpty()
  @IsOptional()
  tag: number
}
