import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthCredintialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authservice: AuthService) {

  }

  @Post('/signup')
  signUp(@Body(ValidationPipe) authCredintialsDto: AuthCredintialsDto): Promise<void> {
    return this.authservice.signUp(authCredintialsDto);
  }

  @Post('/signin')
  signIn(@Body(ValidationPipe) authCredintialsDto: AuthCredintialsDto): Promise<{ accessToken: string }> {
    return this.authservice.signIn(authCredintialsDto);
  }
}
