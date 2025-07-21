import { HttpStatus, Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { ExerciseRepositoryImpl } from "../data/repositories/exercise.repository.impl";
import { ExerciseRepository } from "../domain/repositories/ExerciseRepository";
import { TopicService } from "src/topics/services/topic.service";
import { SkillService } from "src/templates/services/skill.service";
import { TemplateService } from "src/templates/services/template.service";
import { CreateExerciseDto } from "../data/dtos/create-exercise.dto";
import { TemplateSkillService } from "src/templates/services/template_skill.service";
import { catchError, firstValueFrom } from "rxjs";
import { HttpService } from "@nestjs/axios";
import { RpcException } from "@nestjs/microservices";

Injectable()
export class ExerciseService {
    constructor(
        @Inject(ExerciseRepositoryImpl) private readonly exerciseRepository: ExerciseRepository,
        private readonly topicService: TopicService,
        private readonly templateService: TemplateService,
        private readonly skillService: SkillService,
        private readonly templateSkillService: TemplateSkillService,
        private readonly httpService: HttpService
    ) {}

    async create(createExerciseDto: CreateExerciseDto) {
        try {
            const exercise = await this.exerciseRepository.create(createExerciseDto);
            return exercise;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }


    async findByPupil(id: number, learningPathId: number) {
        try {
            const topics = await this.topicService.findByPupil(id, learningPathId);

            const topicIds = topics.map(topic => topic.id);

            const templates = await this.templateService.findByTopics(topicIds);

            const templateIds = templates.map(template => template.id);

            const templateSkills = await this.templateSkillService.findManyByTemplates(templateIds);

            const skills = await this.skillService.findByTemplates(templateIds);

            const skillIds = skills.map((skill) => skill.id);
            
            const skillIdsString = skillIds.join(',');

            // Aquí realizar consulta al servicio que contenga Educando-Historial
            const pupilExercisesResponse = await firstValueFrom(
                this.httpService.get(`/pupil-exercises/pupils/${id}/ids`)
                .pipe(
                    catchError((error) => {
                        console.log('Error en la peticion:', error);
                        throw new RpcException({
                            message: error.message || 'Error en la petición HTTP a pupilExercises',
                            code: error.code || 'HTTP_ERROR',
                            details: error.response?.data || error
                        });
                    })
                )
            )

            const pupilExerciseIds = pupilExercisesResponse.data;

            console.log(pupilExerciseIds);

            let countExercisesByTemplate = []

            if(!pupilExerciseIds || pupilExerciseIds.lenght === 0) {

                countExercisesByTemplate = await this.exerciseRepository.countExercisesByTemplate(pupilExerciseIds);

            } 

            console.log(countExercisesByTemplate);

            // Aquí realizar consulta al servicio que contenga Educando-Estadisticas
            const pupilGradesResponse = await firstValueFrom(
                this.httpService.get(`/pupil-skills/grades/skills?pupilId=${id}&skills=${skillIdsString}`)
                    .pipe(
                        catchError((error) => {
                            console.log('Error en la petición:', error);
                            throw new RpcException({
                                message: error.message || 'Error en la petición HTTP a pupilSkills',
                                code: error.code || 'HTTP_ERROR',
                                details: error.response?.data || error
                            });
                        }) 
                    )
            );

            const grades = pupilGradesResponse.data;

            // Al servicio de AG, le enviaré templates, conteo, calificaciones
            /*
            {
                templates: templateSkills,
                counts: countExercisesByTemplate,
                grade: grades
            };
            */
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

    async getPorcentageByIdAndSkill(id: number, skillId: number) {
        try {
            const exercise = await this.exerciseRepository.getPorcentageByIdAndSkill(id, skillId);
            return exercise.porcentage;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async getPorcentagesByExercise(id: number) {
        try {
            const results = await this.exerciseRepository.getPorcentagesByExercise(id);
            return results;
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST
            });
        }
    }
}