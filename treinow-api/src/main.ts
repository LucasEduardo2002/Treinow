import 'dotenv/config'; // Carrega variáveis de ambiente do arquivo .env
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/**
 * Função de inicialização da aplicação
 * - Cria a instância do NestJS
 * - Carrega todos os módulos
 * - Inicia o servidor na porta configurada
 */
async function bootstrap() {
  // Cria a aplicação NestJS com o módulo principal
  const app = await NestFactory.create(AppModule);
  
  // Inicia o servidor na porta definida no .env ou usa 3000 como padrão
  await app.listen(process.env.PORT ?? 3000);
  
  console.log(`✅ Aplicação iniciada em http://localhost:${process.env.PORT ?? 3000}`);
}

// Executa a função de bootstrap
bootstrap();
