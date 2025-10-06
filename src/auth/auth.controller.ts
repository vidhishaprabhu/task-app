import { Body, Controller, Get, HttpStatus, Post, Request, Res, UseGuards } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import  express from 'express';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { roles } from './decorators/roles.decorator';
import { UserRole } from './entities/user.entity';
import { RolesGuard } from './guards/roles.guard';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService:AuthService){}
  @Post('/register')
  async register(@Body() registerDto:RegisterDto,@Res() res:express.Response){
    try{
      const result=this.authService.register(registerDto);
    return res.status(HttpStatus.CREATED).json({
      succrss:true,
      message:(await result).message,
      email:(await result).email,
      name:(await result).name,
    })
    }
    catch(error){
      return res.status(HttpStatus.BAD_REQUEST).json({
        success:false,
        message:error.message
      })
    }
  }
  // @Post('/login')
  // async login(@Body() loginDto:LoginDto){
  //   return this.authService.login(loginDto);
  // }
  @Post('/login')
  async login(@Body() loginDto:LoginDto,@Res() res:express.Response){
    try{
      // const result = await this.authService.login(loginDto);
      return res.status(HttpStatus.OK).json({
        result:await this.authService.login(loginDto),
        message:'Login created successfully'
      })
    }
    catch(error){
      res.status(HttpStatus.UNAUTHORIZED).json({
        success:false,
        message:'Email and Password not registered'
      })
    }
  }
  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Request() req){
    return req.user;
  }
  @Post('create-admin')
  @roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard,RolesGuard)
  createAdmin(@Body() registerDto:RegisterDto){
    return this.authService.createAdmin(registerDto);
  }
}
