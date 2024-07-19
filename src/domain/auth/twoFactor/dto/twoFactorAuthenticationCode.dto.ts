import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TwoFactorAuthenticationCodeDto {
  @ApiProperty({
    description: 'The two-factor authentication code',
    example: '123456',
  })
  @IsString()
  @IsNotEmpty()
  twoFactorAuthenticationCode: string;
}
