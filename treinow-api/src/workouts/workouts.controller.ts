import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  UseGuards, 
  Req, 
  BadRequestException 
} from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

/**
 * WorkoutsController - Gerencia as rotas de treinos
 * 
 * Endpoints:
 * - Alunos: Iniciar treino, avaliar personal trainer
 * - Personal Trainers: Criar treino, listar treinos
 * 
 * Todas as rotas requerem autenticação via JWT
 */
@Controller() // Deixamos vazio para usar as rotas exatas do desafio
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}

  /**
   * ENDPOINTS PARA ALUNOS
   */

  /**
   * Registra o início de um treino
   * @route POST /store/workout
   * @returns Histórico do treino iniciado
   * @requires Autenticação JWT
   */
  @UseGuards(JwtAuthGuard)
  @Post('store/workout')
  async registerStart(@Req() req) {
    // Pegamos o ID do aluno diretamente do token JWT por segurança
    return this.workoutsService.registerStart(req.user.userId);
  }

  /**
   * Avalia um personal trainer
   * @route POST /personal/:personal_id/rating
   * @param personal_id - ID do personal trainer
   * @param score - Pontuação de 1 a 5 (no body)
   * @returns Avaliação criada
   * @requires Autenticação JWT
   * @throws BadRequestException Se score fora do intervalo 1-5
   */
  @UseGuards(JwtAuthGuard)
  @Post('personal/:personal_id/rating')
  async ratePersonal(
    @Param('personal_id') pId: string,
    @Body() body: { score: number },
    @Req() req
  ) {
    // Validação de nota exigida: entre 1 e 5
    if (body.score < 1 || body.score > 5) {
      throw new BadRequestException('A nota de avaliação deve ser entre 1 e 5.');
    }
    
    // Passamos o ID do aluno (vindo do token) e o ID do personal (vindo da URL)
    return this.workoutsService.ratePersonal(req.user.userId, +pId, body.score);
  }

  /**
   * ENDPOINTS PARA PERSONAL TRAINER
   */

  /**
   * Cria um novo treino
   * @route POST /personal/workout
   * @param createWorkoutDto - Dados do treino (nome e duração)
   * @returns Treino criado
   * @requires Autenticação JWT
   */
  @UseGuards(JwtAuthGuard)
  @Post('personal/workout')
  async create(@Body() createWorkoutDto: CreateWorkoutDto, @Req() req) {
    // Vincula o novo treino ao ID do Personal que está logado
    return this.workoutsService.createWorkout(req.user.userId, createWorkoutDto);
  }

  /**
   * Lista todos os treinos do personal trainer autenticado
   * @route GET /personal/workout
   * @returns Array de treinos criados pelo personal
   * @requires Autenticação JWT
   */
  @UseGuards(JwtAuthGuard)
  @Get('personal/workout')
  async findAll(@Req() req) {
    // Lista apenas os treinos criados pelo personal autenticado
    return this.workoutsService.findAllByPersonal(req.user.userId);
  }
}