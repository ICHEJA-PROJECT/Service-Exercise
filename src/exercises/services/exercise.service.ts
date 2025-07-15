import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { ExerciseRepositoryImpl } from "../data/repositories/exercise.repository.impl";
import { ExerciseRepository } from "../domain/repositories/ExerciseRepository";
import { TopicService } from "src/topics/services/topic.service";
import { SkillService } from "src/templates/services/skill.service";
import { TemplateService } from "src/templates/services/template.service";
import { CreateExerciseDto } from "../data/dtos/create-exercise.dto";

Injectable()
export class ExerciseService {
    constructor(
        @Inject(ExerciseRepositoryImpl) private readonly exerciseRepository: ExerciseRepository,
        private readonly topicService: TopicService,
        private readonly templateService: TemplateService,
        private readonly skillService: SkillService
    ) {}

    async create(createExerciseDto: CreateExerciseDto) {
        try {
            const exercise = await this.exerciseRepository.create(createExerciseDto);
            return exercise;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }


    async findByPupil(id: number) {
        try {
            const topics = await this.topicService.findByPupil(id);

            const topicIds = topics.map(topic => topic.id);

            const templates = await this.templateService.findByTopics(topicIds);

            const templateIds = templates.map(template => template.id);

            const skills = await this.skillService.findByTemplates(templateIds);

            // Aquí realizar consulta al servicio que contenga Educando-Estadisticas
            // Aquí realizar consulta al servicio que contenga Educando-Historial

            // Al servicio de AG, le enviaré skills, templates, Educando-Estadisticas, Educando-Historial

            // Skills, Templates, Conteo, Calificaciones actuales del educando. 
            // Conteo: Consultar al servicio educando_ejercicios para traer que ejercicios a hecho;
            // Calificaciones: Consultar al caso de uso del educando_ejercicio_habilidades Parametros(skills);

            
            return [];
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async findOne(id: number) {
        try {
            const exercise = await this.exerciseRepository.findOne(id);
            return exercise;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async findAll() {
        try {
            const exercises = await this.exerciseRepository.findAll();
            return exercises;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}