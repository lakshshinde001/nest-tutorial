import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "../auth.service";
import { Strategy } from "passport-local";
import { Injectable } from "@nestjs/common";


@Injectable()
export class LocalStrategy extends PassportStrategy (Strategy) {

    constructor(private authService: AuthService) {
        super({
            usernameField: 'email',
        });
    }

    validate (email: string, password: string) {
        return this.authService.validateUser(email, password)
    }
}