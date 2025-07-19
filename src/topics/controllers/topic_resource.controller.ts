import { Controller } from '@nestjs/common';
import { TopicResourceService } from '../services/topic_resource.service';
import { CreateTopicResourceDto } from '../data/dtos/create-topic-resource.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EXERCISE_SERVICE_OPTIONS } from 'src/shared/constants/exercise_service_options';

@Controller('topic-resource')
export class TopicResourceController {
  constructor(private readonly topicResourceService: TopicResourceService) {}

  @MessagePattern({
    cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_TOPIC_RESOURCE_CREATE,
  })
  async create(@Payload() createTopicResourceDto: CreateTopicResourceDto) {
    return await this.topicResourceService.create(createTopicResourceDto);
  }

  @MessagePattern({
    cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_TOPIC_RESOURCE_FIND_ALL,
  })
  async getAll() {
    return await this.topicResourceService.findAll();
  }
}
