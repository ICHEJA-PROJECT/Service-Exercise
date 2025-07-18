import { ExerciseI } from 'src/exercises/domain/entitiesI/ExerciseI';
import { ExerciseRepository } from 'src/exercises/domain/repositories/ExerciseRepository';
import { CreateExerciseDto } from '../dtos/create-exercise.dto';
import { HttpStatus, Injectable } from '@nestjs/common';
import { ExerciseEntity } from '../entities/exercise.entity';
import { Repository } from 'typeorm';
import { TemplateEntity } from 'src/templates/data/entities/template.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ExerciseRepositoryImpl implements ExerciseRepository {
  constructor(
    @InjectRepository(ExerciseEntity)
    private readonly exerciseRepository: Repository<ExerciseEntity>,
    @InjectRepository(TemplateEntity)
    private readonly templateRepository: Repository<TemplateEntity>,
  ) {}

  async create(createExerciseDto: CreateExerciseDto): Promise<ExerciseI> {
    try {
      const template = await this.templateRepository.findOne({
        where: { id: createExerciseDto.template },
      });

      if (!template) {
        throw new RpcException({
          status: HttpStatus.NOT_FOUND,
          message: 'El template seleccionado no existe.',
        });
      }

      const exercise = this.exerciseRepository.create({
        context: createExerciseDto.context,
        template: template,
      });

      return this.exerciseRepository.save(exercise);
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  async findOne(id: number): Promise<ExerciseI> {
    try {
      const exercise = await this.exerciseRepository.findOne({ where: { id } });

      if (!exercise) {
        throw new RpcException({
          status: HttpStatus.NOT_FOUND,
          message: 'El ejercicio solicitado no existe.',
        });
      }

      return exercise;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  async findByTemplate(idTemplate: number): Promise<ExerciseI[]> {
    try {
      const exercises = await this.exerciseRepository.find({
        where: { template: { id: idTemplate } },
        select: { template: { skills: true } },
      });
      return exercises;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }
}
