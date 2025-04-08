import { registerAs } from "@nestjs/config";
import { JwtModuleOptions } from "@nestjs/jwt";

// factory function to access env variables
// this function will be used in the AuthModule to register the JwtModule with the options from the env variables
export default registerAs(
    "jwt", 
     (): JwtModuleOptions => ({
    secret : process.env.JWT_SECRET,
    signOptions : {
        expiresIn : process.env.JWT_EXPIRES_IN
    }
    
}))