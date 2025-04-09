import { ConfigType } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import jwtConfig from "../config/jwt.config";
import { AuthJwtPayload } from "../types/auth-jwtPayload";
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import refreshJwtConfig from "../config/refresh-jwt.config";
import { Request } from "express";
import { AuthService } from "../auth.service";

 @Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'refresh-jwt'){

    constructor(
        @Inject(refreshJwtConfig.KEY)
        private refreshJwtConfiguration: ConfigType<typeof refreshJwtConfig>,
        private authService: AuthService,
      ) {
        console.log('JWT secret at runtime:', refreshJwtConfiguration.secret); // 🔍
        if (!refreshJwtConfiguration.secret) {
          throw new Error('JWT secret is not defined in configuration!');
        }
      
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey: refreshJwtConfiguration.secret,
          ignoreExpiration: false,
          passReqToCallback :  true,
        });
      }
      
      validate(req: Request, payload: AuthJwtPayload) {
        const authHeader = req.get('Authorization');
      
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
          throw new UnauthorizedException('Invalid or missing Authorization header');
        }
      
        const refreshToken = authHeader.replace('Bearer', '').trim();
        const userId = payload.sub;
      
        return this.authService.validateRefreshToken(userId, refreshToken)
      }
}