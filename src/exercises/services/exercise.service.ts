import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ExerciseRepositoryImpl } from '../data/repositories/exercise.repository.impl';
import { ExerciseRepository } from '../domain/repositories/ExerciseRepository';
import { TopicService } from 'src/topics/services/topic.service';
import { SkillService } from 'src/templates/services/skill.service';
import { TemplateService } from 'src/templates/services/template.service';
import { CreateExerciseDto } from '../data/dtos/create-exercise.dto';
import { TemplateSkillService } from 'src/templates/services/template_skill.service';
import { catchError, firstValueFrom } from 'rxjs';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { RECORD_SERVICE_OPTIONS } from 'src/shared/constants/record_service_options';
import { PREFERENCES_SERVICE_OPTIONS } from 'src/shared/constants/preferences_service_options';
import { filterGroups } from 'src/shared/utils/filter-groups';
import { GetPersonalizedExerciseUseCase } from '../domain/usecases/GetPersonalizedExerciseUseCase';

@Injectable()
export class ExerciseService {
  constructor(
    @Inject(ExerciseRepositoryImpl)
    private readonly exerciseRepository: ExerciseRepository,
    private readonly topicService: TopicService,
    private readonly templateService: TemplateService,
    private readonly skillService: SkillService,
    private readonly templateSkillService: TemplateSkillService,
    @Inject(RECORD_SERVICE_OPTIONS.RECORD_SERVICE_NAME)
    private readonly client: ClientProxy,
    @Inject(PREFERENCES_SERVICE_OPTIONS.PREFERENCES_SERVICE_NAME)
    private readonly preferencesClient: ClientProxy,
    private readonly getPersonalizedExerciseUseCase: GetPersonalizedExerciseUseCase,
  ) {}

  async create(createExerciseDto: CreateExerciseDto) {
    try {
      const exercise = await this.exerciseRepository.create(createExerciseDto);
      return exercise;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message || 'Error creating exercise',
      });
    }
  }

  async findByPupil(id: number, learningPathId: number) {
    try {
      const topics = await this.topicService.findByPupil(id, learningPathId);

      const topicIds = topics.map((topic) => topic.id);

      const templates = await this.templateService.findByTopics(topicIds);

      const templateIds = templates.map((template) => template.id);

      const templatesImpairmentsIds = await firstValueFrom(
        this.preferencesClient
        .send(
          { cmd: PREFERENCES_SERVICE_OPTIONS.REACTIVE_IMPAIRMENT_FIND_BY_LEARNING_PATH

          }, 
          {
            id: learningPathId
          }
        )
        .pipe(catchError(error => {
          throw new RpcException({
            message: error.message,
            status: HttpStatus.BAD_REQUEST,
          });
        }))
      );

      console.log('Ids de los ejercicios realizados por el estudiante.')
      console.log(templatesImpairmentsIds);

      const templatesIdsFiltered = filterGroups(templateIds, templatesImpairmentsIds);

      const templateSkills =
        await this.templateSkillService.findManyByTemplates(templatesIdsFiltered);

      const skills = await this.skillService.findByTemplates(templateIds);

      const skillIds = skills.map((skill) => skill.id);

      const skillIdsString = skillIds.join(',');

      // Aquí realizar consulta al servicio que contenga Educando-Historial
      const pupilExerciseIds = await firstValueFrom(
        this.client
          .send(
            { cmd: RECORD_SERVICE_OPTIONS.PUPIL_EXERCISE_FIND_BY_PUPILS_IDS },
            id,
          )
          .pipe(
            catchError((error) => {
              console.log('Error en la peticion:', error);
              throw new RpcException({
                status: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
                message:
                  error.message || 'Error en la petición HTTP a pupilExercises',
                code: error.code || 'HTTP_ERROR',
                details: error.response?.data || error,
              });
            }),
          ),
      );

      console.log('Ids de los ejercicios realizados por el estudiante.')
      console.log(pupilExerciseIds);

    let countExercisesByTemplate = []
      if(!pupilExerciseIds) {
        countExercisesByTemplate =
          await this.exerciseRepository.countExercisesByTemplate(
            pupilExerciseIds,
          );
      }

      // Aquí realizar consulta al servicio que contenga Educando-Estadisticas

      const grades = await firstValueFrom(
        this.client
          .send(
            { cmd: RECORD_SERVICE_OPTIONS.PUPIL_SKILL_FIND_GRADE_BY_SKILLS },
            {
              pupilId: id,
              skills: skillIdsString
                .split(',')
                .map((skill) => parseInt(skill.trim())),
            },
          )
          .pipe(
            catchError((error) => {
              console.log('Error en la petición:', error);
              throw new RpcException({
                status: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
                message:
                  error.message || 'Error en la petición HTTP a pupilSkills',
                code: error.code || 'HTTP_ERROR',
                details: error.response?.data || error,
              });
            }),
          ),
      );

      console.log('Calificaciones del estudiante.')
      console.log(grades);


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


      // La siguiente en implementación es una simulación de lo que procede al utilizar el AG
      let bestTemplates = templates;

      if(templateIds.length > 3) {
        bestTemplates = templates.slice(0, 3);
      }

      const listTemplates = bestTemplates.map((bestTemplate) =>  {return { id: bestTemplate.id, title: bestTemplate.title, time: bestTemplate.suggestTime}});

      let exercises = await Promise.all(
        listTemplates.map(async (template) => {
          let exercise = await this.getRandomByTemplate(template.id, id);
          return {
            ...template,
            exerciseId: exercise.id,
            byTeacher: false,
          }
        })
      );

      return exercises;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message || 'Error fetching exercises by pupil',
      });
    }
  }

  async findOne(id: number, pupilId: number) {
    try {

      const exercise = await this.exerciseRepository.findOne(id);

      const context = await this.getPersonalizedExerciseUseCase.run(exercise, pupilId);
      
      return {
        id: exercise.id,
        context: context,
        layout: exercise.template.layout.name,
        instructions: exercise.template.instructions,
        instructionsMedia: exercise.template.instructionMedias[0],
        suggestTime: exercise.template.suggestTime,
      };
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message || 'Error fetching exercise by ID',
      });
    }
  }

  async findAll() {
    try {
      const exercises = await this.exerciseRepository.findAll();
      return exercises;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message || 'Error fetching exercises',
      });
    }
  }

  async getPorcentageByIdAndSkill(id: number, skillId: number) {
    try {
      const exercise = await this.exerciseRepository.getPorcentageByIdAndSkill(
        id,
        skillId,
      );
      return exercise.porcentage;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message:
          error.message || 'Error fetching exercise percentage by ID and skill',
      });
    }
  }

  async getPorcentages(id: number) {
    try {
      const porcentages = await this.exerciseRepository.getPorcentages(id);
      return porcentages;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  async getRandomByTemplate(templateId: number, pupilId: number) {
    try {
      const exercises = await this.exerciseRepository.findByTemplate(templateId);
      const array = Array.from({ length: exercises.length }, (_, i) => i);
      const exerciseRandomIndex = array[Math.floor(Math.random() * array.length)];
      const exercise = exercises[exerciseRandomIndex];

      const context = await this.getPersonalizedExerciseUseCase.run(exercise, pupilId);

      console.log(context);

      return {
        id: exercise.id,
        context: context,
        layout: exercise.template.layout.name,
        instructions: exercise.template.instructions,
        time: exercise.template.suggestTime,
        instructionsMedia: { 
          type: exercise.template.instructionMedias[0].typeMedia.name,
          media_path: exercise.template.instructionMedias[0].pathMedia
        }
      }
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  async countExercisesByTemplate(pupilExerciseIds: number[]) {
    try {
      return await this.exerciseRepository.countExercisesByTemplate(pupilExerciseIds);
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  async findByIds(ids: number[]) {
    try {
      return await this.exerciseRepository.findByIds(ids);
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }
}
