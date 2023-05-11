import { IsNotEmpty, IsString, Length } from 'class-validator'

export class Registry {
  @IsNotEmpty()
  @IsString()
  @Length(2, 10)
  username: string

  @IsNotEmpty()
  @IsString()
  @Length(6, 18)
  password: string
}
