import { Type } from 'class-transformer'
import { IsNumber, IsString, Length } from 'class-validator'

export class CreateTagDto {
  @IsString()
  @Length(2, 6, { message: '长度在2-6个字符之间' })
  tagName: string

  @IsNumber()
  @Type(() => Number)
  categoryId: number
}
