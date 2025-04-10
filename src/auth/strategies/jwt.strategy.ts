import { ConfigType } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import jwtConfig from "../config/jwt.config";
import { AuthJwtPayload } from "../types/auth-jwtPayload";
import { Inject, Injectable } from "@nestjs/common";
import { AuthService } from "../auth.service";

 @Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(
        @Inject(jwtConfig.KEY)
        private jwtConfiguration: ConfigType<typeof jwtConfig>,
        private authService: AuthService
      ) {
        console.log('JWT secret at runtime:', jwtConfiguration.secret); // 🔍
        if (!jwtConfiguration.secret) {
          throw new Error('JWT secret is not defined in configuration!');
        }
      
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey: jwtConfiguration.secret,
          ignoreExpiration: false,
        });
      }
      
      validate(payload: AuthJwtPayload) {
        console.log('JWT validated payload:', payload); // 🔍
        const userId =  payload.sub ; // or return the full user object if needed

        return this.authService.validateJwtUser(userId)

      }
}