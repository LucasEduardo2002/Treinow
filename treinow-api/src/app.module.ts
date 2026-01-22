import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { WorkoutsModule } from './workouts/workouts.module';

/**
 * AppModule - Módulo principal da aplicação
 * 
 * Este módulo é responsável por:
 * 1. Importar todos os módulos da aplicação
 * 2. Registrar controllers globais
 * 3. Registrar providers globais
 * 4. Configurar as injeções de dependência
 */
@Module({
  // Importa os módulos que serão usados em toda a aplicação
  imports: [PrismaModule, UsersModule, AuthModule, WorkoutsModule],
  // Controllers globais - Podem ser acessados por toda a aplicação
  controllers: [AppController],
  // Providers globais - Disponibilizados para toda a aplicação
  providers: [AppService, PrismaService],
})
export class AppModule {}
