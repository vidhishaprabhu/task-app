import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginDto{
  @IsNotEmpty({'message':'Please provide the email'})
  @IsString({'message':'Email must be string'})
  @MinLength(6,{'message':'Email must be minimum 6 in character'})
  email:string;
  @IsNotEmpty({'message':'Please provide the password'})
  @IsString({'message':'Password must be string'})
  @MinLength(6,{'message':'Password must be minimum 6 in character'})
  password:string;
}