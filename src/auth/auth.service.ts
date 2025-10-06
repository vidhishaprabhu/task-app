import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private readonly userRepository:Repository<User>,
private readonly jwtService:JwtService){bcrypt.hash('vidisha@123',3).then(console.log)}
  async register(registerDto:RegisterDto){
    const existingUser=await this.userRepository.findOne({where:{email:registerDto.email}});
    if(existingUser){
      throw new BadRequestException("User already exists");
    }
    const hashpassword=await bcrypt.hash(registerDto.password,10);
    const newUser=this.userRepository.create({
      email:registerDto.email,
      name:registerDto.name,
      password:hashpassword,
      role:UserRole.EMPLOYEE
    })
    const saveUser=this.userRepository.save(newUser);
    return{
      email:(await saveUser).email,
      name:(await saveUser).name,
      password:(await saveUser).password,
      message:'User registered successfully !!!'
    }
  }
  async login(logindto:LoginDto){
    const user=await this.userRepository.findOne({where:{email:logindto.email}});
    if(!user || !(bcrypt.compare(logindto.password,user.password))){
      throw new UnauthorizedException('Invalid Credentials');
    }
    const {password,...result}=user
    return{
      user:result,
      token:this.generateToken(user)
    }
  }

  private generateToken(user:User){
    return{
      accessToken:this.generateAccessToken(user)
    }
  }
  private generateAccessToken(user:User):string{
    const payload={
      email:user.email,
      id:user.id,
      role:user.role
    }
    return this.jwtService.sign(payload,{
      secret:'secret_key',
      expiresIn:'15m'
    })
  }
  async createAdmin(registerdto:RegisterDto){
    const existingUser=await this.userRepository.findOne({where:{email:registerdto.email}});
    if(existingUser){
      throw new BadRequestException("User already exists");
    }
    const hashpassword=await bcrypt.hash(registerdto.password,10);
    const newUser=this.userRepository.create({
      email:registerdto.email,
      name:registerdto.name,
      password:hashpassword,
      role:UserRole.ADMIN
    })
    const saveUser=this.userRepository.save(newUser);
    return{
      email:(await saveUser).email,
      name:(await saveUser).name,
      password:(await saveUser).password,
      message:'Admin reated successfully !!!'
    }

  }
  async getUserById(userId:number){
    const user=await this.userRepository.findOne({where:{id:userId}});
    if(!user){
      throw new UnauthorizedException('User not found');
    }
    const {password,...result}=user;
    return result;
  }
  
}
