import { Controller, Post, Body, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  async register(@Body() userData: RegisterDto, @Res() res: Response) {
    const result = await this.userService.register(userData, res);
    return res.json(result);
  }

  @Post('login')
  async login(@Body() userData: LoginDto, @Res() res: Response) {
    const result = await this.userService.login(userData, res);
    return res.json(result);
  }
}
