import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserLoginEvent } from './login.events';
import * as fs from 'fs';

@Injectable()
export class EventUserLogin {
  @OnEvent('user.login')
  handlerUserLogin(payload: UserLoginEvent) {
    const pathFile = './src/log/login.log.txt';
    const date = new Date();
    const data = `${date.toISOString()} | ${payload.name}\n`
    fs.appendFileSync(pathFile, data, 'utf-8')
  }
}
