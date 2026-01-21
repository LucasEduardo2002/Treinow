import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // Pega o token do cabeçalho "Authorization: Bearer <TOKEN>"
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // Use a MESMA chave que você colocou no AuthModule
      secretOrKey: 'Treinow2026@Seguro', 
    });
  }

  // O que este método retorna será anexado ao objeto "request" (ex: req.user)
  async validate(payload: any) {
    return { 
      userId: payload.sub, 
      document: payload.document, 
      type: payload.type, 
      name: payload.name 
    };
  }
}