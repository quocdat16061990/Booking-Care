import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import RegisterDto from './dto/register.dto';
import { ApiOperationDecorator } from 'src/common/decorators/api-oepration.decorator';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import LogInDto from './dto/login-dto';
import RequestWithUser from './requestWithUser.interface';
import { LocalAuthenticationGuard } from './localAuthentication.guard';
import JwtAuthenticationGuard from './jwt-authentication.guard';
import { SerializeInterceptor } from 'src/interceptor/serialize.interceptor';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
  @ApiOperationDecorator({
    type: RegisterDto,
    summary: 'Sign In ',
    description: 'Sign In',
  })
  @UseInterceptors(SerializeInterceptor)
  @Post('register')
  async register(@Body() registerData: RegisterDto) {
    const user = await this.authService.register(registerData);
    return user;
  }

  @ApiOperationDecorator({
    type: LogInDto,
    summary: 'Sign Up ',
    description: 'Sign Up',
  })
  @Post('log-in')
  @UseGuards(LocalAuthenticationGuard)
  async logIn(@Req() request: RequestWithUser) {
    const { user } = request;
    const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(
      user.id,
    );
    const { cookie: refreshTokenCookie, token: refreshToken } =
      this.authService.getCookieWithJwtRefreshToken(user.id);

    await this.userService.setCurrentRefreshToken(refreshToken, user.id);

    request.res.setHeader('Set-Cookie', [
      accessTokenCookie,
      refreshTokenCookie,
    ]);

    if (user.isTwoFactorAuthenticationEnabled) {
      return;
    }

    return 'Please check authentication 2FA';
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('user')
  authenticate(@Req() request: RequestWithUser) {
    return request.user;
  }
  @UseGuards(JwtAuthenticationGuard)
  @Post('log-out')
  @HttpCode(200)
  async logOut(@Req() request: RequestWithUser) {
    await this.userService.removeRefreshToken(request.user.id);
    request.res.setHeader('Set-Cookie', this.authService.getCookiesForLogout());
  }
}
