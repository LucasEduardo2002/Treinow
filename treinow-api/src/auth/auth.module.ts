import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module'; // Importa o módulo de usuários
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule, // Permite que o Auth use o UsersService
    PassportModule,
    JwtModule.register({
      secret: 'Treinow2026@Seguro', // Sua chave secreta (mantenha em segurança)
      signOptions: { expiresIn: '1d' }, // Token vale por 1 dia
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}