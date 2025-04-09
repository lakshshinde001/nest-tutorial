import { ConfigType } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import jwtConfig from "../config/jwt.config";
import { AuthJwtPayload } from "../types/auth-jwtPayload";
import { Inject, Injectable } from "@nestjs/common";
import refreshJwtConfig from "../config/refresh-jwt.config";

 @Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'refresh-jwt'){

    constructor(
        @Inject(refreshJwtConfig.KEY)
        private refreshJwtConfiguration: ConfigType<typeof refreshJwtConfig>,
      ) {
        console.log('JWT secret at runtime:', refreshJwtConfiguration.secret); // 🔍
        if (!refreshJwtConfiguration.secret) {
          throw new Error('JWT secret is not defined in configuration!');
        }
      
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey: refreshJwtConfiguration.secret,
        });
      }
      
      validate(payload: AuthJwtPayload) {
        console.log('JWT validated payload:', payload); // 🔍
        return { id: payload.sub }; // or return the full user object if needed
      }
}