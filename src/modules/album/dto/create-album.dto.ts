import { Type } from 'class-transformer'
import { IsNotEmpty, IsString, Length } from 'class-validator'
export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 20)
  title: string

  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  description: string

  @Type(() => Object)
  file: any
}
