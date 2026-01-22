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

@Controller() // Deixamos vazio para usar as rotas exatas do desafio
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}

  /**
   * ENDPOINTS PARA ALUNOS
   */

  // Registro de início de treino (POST /store/workout)
  @UseGuards(JwtAuthGuard)
  @Post('store/workout')
  async registerStart(@Req() req) {
    // Pegamos o ID do aluno diretamente do token JWT por segurança
    return this.workoutsService.registerStart(req.user.userId);
  }

  // Avaliar personal (POST /personal/:personal_id/rating)
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

  // Cadastro de treino (POST /personal/workout)
  @UseGuards(JwtAuthGuard)
  @Post('personal/workout')
  async create(@Body() createWorkoutDto: CreateWorkoutDto, @Req() req) {
    // Vincula o novo treino ao ID do Personal que está logado
    return this.workoutsService.createWorkout(req.user.userId, createWorkoutDto);
  }

  // Consulta de treinos (GET /personal/workout)
  @UseGuards(JwtAuthGuard)
  @Get('personal/workout')
  async findAll(@Req() req) {
    // Lista apenas os treinos criados pelo personal autenticado
    return this.workoutsService.findAllByPersonal(req.user.userId);
  }
}