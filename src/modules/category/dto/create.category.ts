import { IsString, Length } from 'class-validator'

export class CreateCategoryDTO {
  @IsString()
  @Length(2, 8)
  name: string
}
