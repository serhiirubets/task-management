import { Entity, EntityRepository, Repository } from "typeorm";
import { User } from './user.entity';
import { AuthCredintialsDto } from './dto/auth-credentials.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signup(authCredentials: AuthCredintialsDto): Promise<void> {
    const user = new User();
    user.username = authCredentials.username;
    user.password = authCredentials.password;
    await user.save();
  }
}