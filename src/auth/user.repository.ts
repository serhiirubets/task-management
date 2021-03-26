import { Entity, EntityRepository, Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { AuthCredintialsDto } from './dto/auth-credentials.dto';
import { ConflictException, InternalServerErrorException } from "@nestjs/common";


@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentials: AuthCredintialsDto): Promise<void> {
    const user = new User();
    user.username = authCredentials.username;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(authCredentials.password, user.salt);

    try {
      await user.save();
    } catch(error) {
      if (error.code === '23505') { // duplicate username
        throw new ConflictException('Username already exist');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async hashPassword(password: string, salt: string): Promise<string> {

    return bcrypt.hash(password, salt);
  }

  async validateUserPassword(userCredentials: AuthCredintialsDto): Promise<string> {
    const { username, password } = userCredentials;
    const user = await this.findOne({ username });
    console.log(user)

    if (user && await user.validatePassword(password)) {
      return username;
    }

    return null
  }
}