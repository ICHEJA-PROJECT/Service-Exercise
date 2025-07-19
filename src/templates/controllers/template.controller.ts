import { Controller } from '@nestjs/common';
import { TemplateService } from '../services/template.service';
import { CreateTemplateDto } from '../data/dtos/create-template.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EXERCISE_SERVICE_OPTIONS } from 'src/shared/constants/exercise_service_options';

@Controller('templates')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @MessagePattern({
    cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_TEMPLATE_CREATE,
  })
  async create(@Payload() createTemplateDto: CreateTemplateDto) {
    return await this.templateService.create(createTemplateDto);
  }

  @MessagePattern({
    cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_TEMPLATE_FIND_ALL,
  })
  async getAll() {
    return await this.templateService.findAll();
  }

  @MessagePattern({
    cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_TEMPLATE_FIND_BY_TOPICS_ID,
  })
  async getByTopics(@Payload() topics: number[]) {
    return this.templateService.findByTopics(topics);
  }

  @MessagePattern({
    cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_TEMPLATE_FIND_BY_TOPIC_ID,
  })
  async getByTopic(@Payload() id: number) {
    return await this.templateService.findByTopic(id);
  }

  @MessagePattern({
    cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_TEMPLATE_FIND_BY_ID,
  })
  async getById(@Payload() id: number) {
    return await this.templateService.findOne(id);
  }
}
