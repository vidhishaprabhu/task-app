import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports:[TypeOrmModule.forFeature([User]), PassportModule.register({ defaultStrategy: 'jwt' }),JwtModule.register({
    secret:'secret_key',
    signOptions:{expiresIn:'15m'}
  })],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy,RolesGuard],
  exports:[AuthService,RolesGuard]
})
export class AuthModule {}
