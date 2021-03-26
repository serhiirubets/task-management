import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredintialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository) {
  }

  signUp(authCredentials: AuthCredintialsDto): Promise<void> {
    return this.userRepository.signUp(authCredentials);
  }

  async signIn(authCredentials: AuthCredintialsDto): Promise<void> {
    const username = await this.userRepository.validateUserPassword(authCredentials);

    if (!username) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
