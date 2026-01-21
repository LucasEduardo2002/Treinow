import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  // Esse método faz a API conectar ao arquivo dev.db assim que o servidor subir
  async onModuleInit() {
    await this.$connect();
  }
}