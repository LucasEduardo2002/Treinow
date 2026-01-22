import { Injectable } from '@nestjs/common';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class WorkoutsService {
  
   // Injetamos o Prisma para acessar o banco de dados
  constructor(private prisma: PrismaService) {}

    async registerStart(studentId: number) {
      // Logic to register the start of a workout for a student
      return this.prisma.workoutHistory.create({ 
        data: { 
          studentId: studentId, 
          startTime: new Date() 
        }
      });
    }
  
    async createWorkout(personalId: number, data: CreateWorkoutDto) {
      // Logic to create a workout for a student by a personal trainer
      return this.prisma.workout.create({ 
        data: { 
          ...data,
          personalId: personalId
        }
      });
    }

    async findAllByPersonal(personalId: number) {
      // List all workouts created by a personal trainer
      return this.prisma.workout.findMany({
        where: { personalId: personalId }
      });
    }

    async ratePersonal(studentId: number, personalId: number, score: number) {
      // Create a rating for a personal trainer
      return this.prisma.rating.create({
        data: {
          score: score,
          personalId: personalId
        }
      });
    }

    async registerStudentWorkout(studentId: number) {
      return this.prisma.workoutHistory.create({
        data: { studentId }
      });
    }

    async deleteAccount(userId: number) {
      return this.prisma.user.delete({ where: { id: userId } });
    }
  }