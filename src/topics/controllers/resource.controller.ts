import { Controller } from '@nestjs/common';
import { ResourceService } from '../services/resource.service';
import { CreateResourceDto } from '../data/dtos/create-resource.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EXERCISE_SERVICE_OPTIONS } from 'src/shared/constants/exercise_service_options';

@Controller('resources')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  @MessagePattern({
    cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_RESOURCE_FIND_ALL,
  })
  async getAll() {
    return await this.resourceService.findAll();
  }

  @MessagePattern({
    cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_RESOURCE_FIND_BY_PUPIL,
  })
  async getByPupil(@Payload() id: number, @Payload() learningPathId: number) {
    return await this.resourceService.findByPupil(id, learningPathId);
  }

  @MessagePattern({
    cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_RESOURCE_FIND_BY_TOPIC,
  })
  async getByTopic(@Payload() id: number) {
    return await this.resourceService.findByTopic(id);
  }

  @MessagePattern({
    cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_RESOURCE_FIND_BY_ID,
  })
  async getById(@Payload() id: number) {
    return await this.resourceService.findOne(id);
  }

  @MessagePattern({
    cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_RESOURCE_CREATE,
  })
  async create(@Payload() createResourceDto: CreateResourceDto) {
    return await this.resourceService.create(createResourceDto);
  }
}
