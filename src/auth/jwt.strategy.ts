import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPaylod } from '../../dist/auth/jwt-payload';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import * as config from 'config';
const jwtConfig = config.get('jwt');

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || jwtConfig.secret
    })
  }

  async validate({ username }: JwtPaylod): Promise<User> {
    const user = await this.userRepository.findOne({ username });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }
}