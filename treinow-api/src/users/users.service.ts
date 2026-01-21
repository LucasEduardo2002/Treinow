import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  // Injetamos o Prisma para acessar o banco de dados
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    // 1. Regra do Desafio: Verificar se e-mail ou documento já existem
    const userExists = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: createUserDto.email },
          { document: createUserDto.document },
        ],
      },
    });

    if (userExists) {
      // Retorna erro 409 se houver duplicata
      throw new ConflictException('E-mail ou Documento já cadastrado.');
    }

    // 2. Segurança: Criptografar a senha antes de salvar
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // 3. Salvar no SQLite
    return this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });
  }

  // Método auxiliar para o Login que faremos depois
  async findByDocument(document: string) {
    return this.prisma.user.findUnique({ where: { document } });
  }
}