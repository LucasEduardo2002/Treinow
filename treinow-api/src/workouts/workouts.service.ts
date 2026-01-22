import { Injectable } from '@nestjs/common';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { PrismaService } from '../prisma/prisma.service';

/**
 * WorkoutsService - Gerencia a lógica de negócio dos treinos
 * 
 * Responsabilidades:
 * - Criar novos treinos
 * - Registrar histórico de treinos
 * - Gerenciar avaliações de personal trainers
 */
@Injectable()
export class WorkoutsService {
  
  // Injeta o PrismaService para acessar o banco de dados
  constructor(private prisma: PrismaService) {}

  /**
   * Registra o início de um treino para um aluno
   * @param studentId - ID do aluno
   * @returns Registro do histórico de treino criado
   */
  async registerStart(studentId: number) {
    // Cria um novo registro no histórico de treinos com a hora atual
    return this.prisma.workoutHistory.create({ 
      data: { 
        studentId: studentId, 
        startTime: new Date() 
      }
    });
  }
  
  /**
   * Cria um novo treino (Apenas Personal Trainers)
   * @param personalId - ID do personal trainer
   * @param data - Dados do treino (nome e duração)
   * @returns Treino criado
   */
  async createWorkout(personalId: number, data: CreateWorkoutDto) {
    // Cria um novo treino vinculado ao personal trainer
    return this.prisma.workout.create({ 
      data: { 
        ...data,
        personalId: personalId
      }
    });
  }

  /**
   * Lista todos os treinos de um personal trainer
   * @param personalId - ID do personal trainer
   * @returns Array de treinos do personal
   */
  async findAllByPersonal(personalId: number) {
    // Busca todos os treinos onde o personal é o criador
    return this.prisma.workout.findMany({
      where: { personalId: personalId }
    });
  }

  /**
   * Avalia um personal trainer
   * @param studentId - ID do aluno (autor da avaliação)
   * @param personalId - ID do personal trainer (avaliado)
   * @param score - Pontuação de 1 a 5
   * @returns Avaliação criada
   */
  async ratePersonal(studentId: number, personalId: number, score: number) {
    // Cria uma nova avaliação para o personal trainer
    return this.prisma.rating.create({
      data: {
        score: score,
        personalId: personalId
      }
    });
  }

  /**
   * Registra um treino para um aluno
   * @param studentId - ID do aluno
   * @returns Registro do histórico de treino criado
   */
  async registerStudentWorkout(studentId: number) {
    return this.prisma.workoutHistory.create({
      data: { studentId }
    });
  }

  /**
   * Deleta a conta de um usuário
   * @param userId - ID do usuário
   * @returns Usuário deletado
   */
  async deleteAccount(userId: number) {
    return this.prisma.user.delete({ where: { id: userId } });
  }
}