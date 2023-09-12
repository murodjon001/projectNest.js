import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
type payload = {
  sub: string;
  email: string;
};

@Injectable()
export class JwtServices {
  constructor(private jwtService: JwtService) {}
  async tokenAccess(payload: payload): Promise<any> {
    const token = await this.jwtService.signAsync(payload);
    return {
      statusCode: 200,
      msg: 'Login successful',
      token: token,
    };
  }
  async verifyToken(token: string): Promise<any> {
    const tokenVerify = await this.jwtService.verifyAsync(token, {
      secret: '21723aoi374@6#qohsdljf%7w3r7^8werw847*rysi&ei?r7w443s',
    });
    return tokenVerify;
  }
}
