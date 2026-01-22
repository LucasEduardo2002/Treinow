import 'dotenv/config'; // Carrega variáveis de ambiente
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * PrismaService - Gerencia a conexão com o banco de dados
 * 
 * Esta é uma classe singleton que:
 * - Estende PrismaClient para ter acesso aos métodos do Prisma
 * - Implementa OnModuleInit para conectar ao banco de dados ao iniciar
 * - Implementa OnModuleDestroy para desconectar ao finalizar
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  /**
   * Construtor
   * - Inicializa a conexão com o banco de dados
   * - Carrega as variáveis de ambiente automaticamente
   */
  constructor() {
    super();
  }

  /**
   * Executado quando o módulo é inicializado
   * - Conecta à base de dados
   * - Valida a conexão
   */
  async onModuleInit() {
    await this.$connect();
    console.log('✅ Banco de dados conectado com sucesso');
  }

  /**
   * Executado quando o módulo é destruído (ao finalizar a aplicação)
   * - Desconecta do banco de dados
   * - Libera recursos
   */
  async onModuleDestroy() {
    await this.$disconnect();
    console.log('❌ Desconectado do banco de dados');
  }
}