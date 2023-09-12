import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { JwtServices } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import { jwtConstants } from './auth.constants';


@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [
    JwtServices, 
    AuthGuard,
  ],
  exports: [
    JwtServices, 
    AuthGuard,
  ],
})
export class AuthModule {}


