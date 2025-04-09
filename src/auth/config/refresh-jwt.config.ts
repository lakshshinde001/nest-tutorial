import { registerAs } from "@nestjs/config";
import { JwtModuleOptions, JwtSignOptions } from "@nestjs/jwt";

// factory function to access env variables
// this function will be used in the AuthModule to register the JwtModule with the options from the env variables
export default registerAs(
    "refresh-jwt", 
     (): JwtSignOptions => ({
    secret : process.env.REFRESH_JWT_SECRET,

    expiresIn : process.env.REFRESH_JWT_EXPIRES_IN
    
}))