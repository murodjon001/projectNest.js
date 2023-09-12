import { PrismaService } from '../../database/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { JwtServices } from './auth/auth.service';
import {EventEmitter2} from '@nestjs/event-emitter'
import { UserLoginEvent } from './events/login.events';

type User = {
  email: string;
  password: string;
};

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtServices,
    private eventEmitter: EventEmitter2
  ) {}

  async login(body: User, res: Response): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    if (!user)
    throw new UnauthorizedException();
    const password = await bcrypt.compare(body.password, user.password);
    if (!password) throw new UnauthorizedException();
    const payload = {
      sub: user.id,
      email: user.email,
    };
    this.eventEmitter.emit(
      'user.login',
      new UserLoginEvent(user.id),
    );
    
    const result = await this.jwtService.tokenAccess(payload);
    return result;
  }


  async register(body: Prisma.UserCreateInput, res: Response): Promise<any> {
    const unique = await this.prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    if (unique)
    throw new UnauthorizedException();
    const hash: string = await bcrypt.hash(body.password, 10);
    const newUser = await this.prisma.user.create({
      data: {
        lastName: body.lastName,
        firstName: body.firstName,
        email: body.email,
        password: hash,
      },
    });
    return {
      statusCode: 201,
      msg: 'User created successfully',
    };
  }
}

