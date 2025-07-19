import { Controller } from '@nestjs/common';
import { TemplateInstructionMediaService } from '../services/template_instruction_media.service';
import { CreateTemplateInstructionMediaDto } from '../data/dtos/create-template-instruction-media.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EXERCISE_SERVICE_OPTIONS } from 'src/shared/constants/exercise_service_options';

@Controller('templates-instructions-medias')
export class TemplateInstructionMediaController {
  constructor(
    private readonly templateInstructionMediaService: TemplateInstructionMediaService,
  ) {}

  @MessagePattern({
    cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_TEMPLATE_INSTRUCTION_MEDIA_CREATE,
  })
  async create(@Payload() body: CreateTemplateInstructionMediaDto) {
    return await this.templateInstructionMediaService.create(body);
  }

  @MessagePattern({
    cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_TEMPLATE_INSTRUCTION_MEDIA_FIND_ALL,
  })
  async getAll() {
    return await this.templateInstructionMediaService.findAll();
  }
}
