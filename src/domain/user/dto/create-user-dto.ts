import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
export class CreateUserDto {
  @ApiProperty({
    example: 'abc@example.com',
    description: 'Email',
    format: 'email',
    uniqueItems: true,
    minLength: 6,
    maxLength: 255,
    nullable: false,
  })
  @MaxLength(255)
  @MinLength(6)
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Username ',
  })
  @MaxLength(20)
  @MinLength(1)
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty({
    description: 'Password',
  })
  @MinLength(8)
  @IsString()
  @IsNotEmpty()
  password: string;
}

export default CreateUserDto;
