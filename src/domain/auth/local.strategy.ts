import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import User from '../user/entity/user.entity';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authenticationService: AuthService) {
    super({
      usernameField: 'email',
    });
  }
  async validate(email: string, password: string): Promise<User> {
    return this.authenticationService.getAuthenticatedUser(email, password);
  }
}
