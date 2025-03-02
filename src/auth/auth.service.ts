import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  private readonly saltRounds = 10;

  async signIn(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByName(username);
    if (!user) {
      throw new UnauthorizedException();
    }

    const isPasswordMatching = await this.comparePasswords(
      password,
      user.password_hash,
    );
    if (!isPasswordMatching) {
      throw new UnauthorizedException();
    }

    const token = await this.createToken(user.id, user.name);
    return {
      access_token: token,
    };
  }

  async signUp(
    username: string,
    email: string,
    password: string,
  ): Promise<any> {
    const hashedPassword = await this.hashPassword(password);
    const user = await this.usersService.create({
      name: username,
      email: email,
      password_hash: hashedPassword,
    });

    const token = await this.createToken(user.id, user.name);
    return {
      access_token: token,
    };
  }

  async hashPassword(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, this.saltRounds);
    return hashedPassword;
  }

  async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  async createToken(id: number, username: string): Promise<string> {
    const payload = { id: id, username: username };
    const token = await this.jwtService.signAsync(payload);
    return token;
  }
}
