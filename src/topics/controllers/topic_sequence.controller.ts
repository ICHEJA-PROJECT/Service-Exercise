import { Controller } from '@nestjs/common';
import { TopicSequenceService } from '../services/topic_sequence.service';
import { CreateTopicSequenceDto } from '../data/dtos/create-topic-sequence.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EXERCISE_SERVICE_OPTIONS } from 'src/shared/constants/exercise_service_options';

@Controller('topics-sequences')
export class TopicSequenceController {
  constructor(private readonly topicSequenceSevrice: TopicSequenceService) {}

  @MessagePattern({
    cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_TOPIC_SEQUENCE_CREATE,
  })
  async create(@Payload() createTopicSequenceDto: CreateTopicSequenceDto) {
    return await this.topicSequenceSevrice.create(createTopicSequenceDto);
  }

  @MessagePattern({
    cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_TOPIC_SEQUENCE_FIND_ALL,
  })
  async getAll() {
    return await this.topicSequenceSevrice.findAll();
  }
}
