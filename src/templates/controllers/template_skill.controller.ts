import { Controller } from '@nestjs/common';
import { TemplateSkillService } from '../services/template_skill.service';
import { CreateTemplateSkillDto } from '../data/dtos/create-template-skill.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EXERCISE_SERVICE_OPTIONS } from 'src/shared/constants/exercise_service_options';

@Controller('templates-skills')
export class TemplateSkillController {
  constructor(private readonly templateSkillService: TemplateSkillService) {}

  @MessagePattern({
    cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_TEMPLATE_SKILL_CREATE,
  })
  async create(@Payload() createTemplateSkillDto: CreateTemplateSkillDto) {
    return await this.templateSkillService.create(createTemplateSkillDto);
  }

  @MessagePattern({
    cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_TEMPLATE_SKILL_FIND_ALL,
  })
  async getAll() {
    return await this.templateSkillService.findAll();
  }
}
