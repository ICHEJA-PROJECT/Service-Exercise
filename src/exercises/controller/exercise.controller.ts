import { Controller } from '@nestjs/common';
import { ExerciseService } from '../services/exercise.service';
import { CreateExerciseDto } from '../data/dtos/create-exercise.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EXERCISE_SERVICE_OPTIONS } from 'src/shared/constants/exercise_service_options';

@Controller('exercises')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @MessagePattern({ cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_CREATE })
  async create(@Payload() createExerciseDto: CreateExerciseDto) {
    return await this.exerciseService.create(createExerciseDto);
  }

  @MessagePattern({ cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_FIND_ALL })
  async findAll() {
    return await this.exerciseService.findAll();
  }

  @MessagePattern({ cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_PERCENTAGE })
  async getPorcentageByIdAndSkill(@Payload() { id, skillId }) {
    return await this.exerciseService.getPorcentageByIdAndSkill(id, skillId);
  }

  @MessagePattern({ cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_FIND_BY_PUPIL_ID })
  async findByPupil(@Payload() { id, learningPathId }: { id: number, learningPathId: number }) {
    return await this.exerciseService.findByPupil(id, learningPathId);
  }

  @MessagePattern({ cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_FIND_BY_ID })
  async findOne(@Payload() id: number) {
    return await this.exerciseService.findOne(id);
  }

  @MessagePattern({ cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_PERCENTAGES_BY_ID })
  async getPorcentages(@Payload() id: number) {
    return await this.exerciseService.getPorcentages(id);
  }

  @MessagePattern({ cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_RANDOM_FIND_BY_TEMPLATE })
  async getRandomByTemplate(@Payload() id: number) {
    return await this.exerciseService.getRandomByTemplate(id);
  }
  
  @MessagePattern(({ cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_FIND_BY_IDS }))
  async getByIds(@Payload() ids: number[]) {
    return await this.exerciseService.findByIds(ids);
  }
}