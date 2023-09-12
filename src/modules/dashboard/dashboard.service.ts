import { Injectable } from '@nestjs/common';

@Injectable()
export class Test {
  gethello(): string {
    console.log();
    return 'Hello World!';
  }
}
