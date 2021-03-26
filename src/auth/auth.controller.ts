import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthCredintialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authservice: AuthService) {

  }

  @Post('/signup')
  signUp(@Body(ValidationPipe) authCredintialsDto: AuthCredintialsDto): Promise<void> {
    return this.authservice.signUp(authCredintialsDto);
    console.log(authCredintialsDto);
  }

  @Post('/signin')
  signIn(@Body(ValidationPipe) authCredintialsDto: AuthCredintialsDto): Promise<void> {
    return this.authservice.signIn(authCredintialsDto);
  }
}
