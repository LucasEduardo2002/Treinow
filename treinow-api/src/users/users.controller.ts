import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  UseGuards, 
  Req 
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller() // Deixamos vazio para usar rotas personalizadas
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('users') // Rota de cadastro
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // Requisito: Deletar conta (DELETE /account/delete)
  @UseGuards(JwtAuthGuard)
  @Delete('account/delete')
  async remove(@Req() req) {
    // Usamos o ID que vem do Token (req.user.userId) por segurança
    return this.usersService.remove(req.user.userId);
  }

  // Outras rotas auxiliares (opcional para o desafio, mas bom para teste)
  @Get('users/:id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);}
}
