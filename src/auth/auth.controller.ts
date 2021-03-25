import { Body, Controller, Post } from '@nestjs/common';
import { AuthCredintialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authservice: AuthService) {

  }

  @Post('/signup')
  signup(@Body() authCredintialsDto: AuthCredintialsDto): Promise<void> {
    return this.authservice.signup(authCredintialsDto);
    console.log(authCredintialsDto);
  }
}
