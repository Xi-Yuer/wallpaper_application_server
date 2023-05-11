import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator'

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 10)
  username: string

  @IsNotEmpty()
  @IsString()
  @Length(6, 18)
  password: string

  @IsString()
  @IsOptional()
  avatar?: string
}
