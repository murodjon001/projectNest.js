import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { JwtServices } from "./auth.service";

declare global{
    namespace Express {
        interface Request {
            user: any
        }
    }
}

@Injectable()
export class TokenMiddlware implements NestMiddleware {
    constructor(private jwtService:JwtServices){}

    async use(req: Request, res: Response, next: NextFunction) {
        console.log('token middleware.....')
        const token = req.headers.authorization;
        console.log(token+" Bu token")
        if(!token)
            return res.status(401).json({msg: "Token is missing!"})
        try{
            const decoded = await this.jwtService.verifyToken(token);
            req.user = decoded;
            next()
        }catch(error){
            return res.status(401).json({msg:"Invalid token"})
        }
    }
}