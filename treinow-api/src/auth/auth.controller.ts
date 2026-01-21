import { Controller, Get, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get() // O desafio exige especificamente o método GET para login
  async login(@Body() body: { document: string; pass: string }) {
    // 1. Valida se as credenciais estão certas
    const user = await this.authService.validateUser(body.document, body.pass);
    
    // 2. Gera e retorna o token JWT
    return this.authService.login(user);
  }
}