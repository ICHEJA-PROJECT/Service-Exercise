import { Controller } from '@nestjs/common';
import { TopicService } from '../services/topic.service';
import { CreateTopicDto } from '../data/dtos/create-topic.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EXERCISE_SERVICE_OPTIONS } from 'src/shared/constants/exercise_service_options';

@Controller('topics')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @MessagePattern({ cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_TOPIC_FIND_ALL })
  async getAll() {
    return await this.topicService.findAll();
  }

  @MessagePattern({
    cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_TOPIC_FIND_BY_PUPIL,
  })
  async getTopicsByPupil(@Payload() { id, learningPathId }: { id: number, learningPathId: number }) {
    return await this.topicService.findByPupil(id, learningPathId);
  }

  @MessagePattern({
    cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_TOPIC_CREATE,
  })
  async create(@Payload() createTopicDto: CreateTopicDto) {
    return await this.topicService.create(createTopicDto);
  }

  @MessagePattern({
    cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_TOPIC_FIND_BY_ID,
  })
  async getTopic(@Payload() { id, learningPathId }: { id: number, learningPathId: number}) {
    return await this.topicService.findOne(id, learningPathId);
  }
}
