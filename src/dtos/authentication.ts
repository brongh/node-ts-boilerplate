import { IsEmail, MinLength } from "class-validator";
import { Trim } from "class-sanitizer";

export class authenticationDto {
  @IsEmail({}, { message: "Invalid email" })
  @Trim()
  public email?: string;

  @MinLength(8, { message: "Password should be minimum of 8 characters" })
  public password?: string;
}
