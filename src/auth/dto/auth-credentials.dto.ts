import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredintialsDto {
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(
    /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    { message: 'Password to week '}
  )
  password: string;
}