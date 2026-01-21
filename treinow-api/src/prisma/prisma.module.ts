import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Isso torna o banco disponível em todo o projeto
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}