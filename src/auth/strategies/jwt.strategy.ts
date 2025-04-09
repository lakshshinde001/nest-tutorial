import { ConfigType } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import jwtConfig from "../config/jwt.config";
import { AuthJwtPayload } from "../types/auth-jwtPayload";
import { Inject, Injectable } from "@nestjs/common";

 @Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(
        @Inject(jwtConfig.KEY)
        private jwtConfiguration: ConfigType<typeof jwtConfig>,
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
        return { id: payload.sub }; // or return the full user object if needed
      }
}