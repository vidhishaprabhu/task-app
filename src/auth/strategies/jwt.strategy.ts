import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "../auth.service";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable, UnauthorizedException } from "@nestjs/common";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  constructor(private readonly authservice:AuthService){
    super({
      jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,  
      secretOrKey: 'secret_key'   
    })
  }
  async validate(payload:any){
    try{
        const user=await this.authservice.getUserById(payload.id)
        return{
          id:user.id,
          email:user.email,
          name:user.name,
          role:user.role
        }
    }
    catch(error){
      throw new UnauthorizedException('Invalid token');
    }

  }
}