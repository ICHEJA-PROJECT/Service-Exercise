import { ExerciseI } from "src/exercises/domain/entitiesI/ExerciseI";
import { ExerciseRepository } from "src/exercises/domain/repositories/ExerciseRepository";
import { CreateExerciseDto } from "../dtos/create-exercise.dto";
import { Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { ExerciseEntity } from "../entities/exercise.entity";
import { Repository } from "typeorm";
import { TemplateEntity } from "src/templates/data/entities/template.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ExerciseRepositoryImpl implements ExerciseRepository {
    constructor(
        @InjectRepository(ExerciseEntity) private readonly exerciseRepository: Repository<ExerciseEntity>, 
        @InjectRepository(TemplateEntity) private readonly templateRepository: Repository<TemplateEntity>
    ) {}

    async create(createExerciseDto: CreateExerciseDto): Promise<ExerciseI> {
        try {
            const template = await this.templateRepository.findOne({where: {id: createExerciseDto.template}});

            if(!template) throw new NotFoundException('el template seleccionado no existe.')
                
            const exercise = this.exerciseRepository.create({context: createExerciseDto.context, template: template});

            return this.exerciseRepository.save(exercise);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async findOne(id: number): Promise<ExerciseI> {
        try {
            const exercise = await this.exerciseRepository.findOne({where:{id}, relations: {template: {skills: true}}});

            if(!exercise) throw new NotFoundException('el ejercicio solicitado no existe.')

            return exercise;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async findByTemplate(idTemplate: number): Promise<ExerciseI[]> {
        try {
            const exercises = await this.exerciseRepository.find({where: {template: {id: idTemplate}}, select: {template: {skills: true}}});
            return exercises;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async findAll(): Promise<ExerciseI[]> {
        try {
            const exercises = await this.exerciseRepository.find();
            return exercises;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async countExercisesByTemplate(exerciseIds: number[]): Promise<any> {
        try {
            const results = await this.exerciseRepository
                .createQueryBuilder('e')
                .innerJoin('e.template', 't')
                .select('t.id', 'id_reactivo')
                .addSelect('COUNT(DISTINCT e.id)', 'cantidad_ejercicios')
                .where('e.id IN (:...exerciseIds)', {exerciseIds})
                .groupBy('t.id')
                .getRawMany();

            return results.map((result) => ({
                id_reactivo: parseInt(result.id_reactivo),
                cantidad_ejercicios: parseInt(result.cantidad_ejercicios)
            }));
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async getPorcentageByIdAndSkill(id: number, skillId: number): Promise<any> {
        try {
            const result = await this.exerciseRepository
                .createQueryBuilder('e')
                .select('ts.porcentage', 'porcentage')
                .innerJoin('e.template', 't')
                .innerJoin('t.skills', 'ts')
                .innerJoin('ts.skill', 's')
                .where('e.id = :id', { id })
                .andWhere('s.id = :skillId', { skillId })
                .getRawOne();

            if(!result) throw new NotFoundException("Datos invalidos, porcentaje no encontrado para el ejercicio y habilidad indicados.");
            
            return result;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}