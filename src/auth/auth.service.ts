import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredintialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository) {
  }

  signup(authCredentials: AuthCredintialsDto): Promise<void> {
    return this.userRepository.signup(authCredentials);
  }
}
