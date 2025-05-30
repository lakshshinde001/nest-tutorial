import { Controller, HttpCode, HttpStatus, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { userInfo } from 'os';
import { RefreshAuthGuard } from './guards/refresh-auth/refresh-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService : AuthService) {}

    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login (@Request() req) {
        return this.authService.login(req.user.id)
    }

    @UseGuards(RefreshAuthGuard)
    @Post('refresh')
    refreshToken(@Req() req){
        return this.authService.refreshToken(req.user.id);
    }
    

    @UseGuards(JwtAuthGuard)
    @Post('signout')
    signout(@Req() req){
        this.authService.signOut(req.user.id)
    }
}
