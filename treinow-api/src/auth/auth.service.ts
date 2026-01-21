import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService, // Usado para buscar o usuário no banco
    private jwtService: JwtService,     // Usado para criar o token assinado
  ) {}

  async validateUser(document: string, pass: string): Promise<any> {
    // Busca o usuário pelo documento (método que criamos no UsersService)
    const user = await this.usersService.findByDocument(document);

    // Compara a senha digitada com a senha criptografada do banco
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result; // Retorna o usuário sem a senha
    }
    
    // Se algo estiver errado, barra o acesso
    throw new UnauthorizedException('Documento ou senha incorretos');
  }

  async login(user: any) {
    // Define o que vai estar "escrito" dentro do token (Payload)
    const payload = { 
      sub: user.id, 
      document: user.document, 
      type: user.type, 
      name: user.name 
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}