import { Controller } from '@nestjs/common';
import { SkillService } from '../services/skill.service';
import { CreateSkillDto } from '../data/dtos/create-skill.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EXERCISE_SERVICE_OPTIONS } from 'src/shared/constants/exercise_service_options';

@Controller('skills')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @MessagePattern({ cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_SKILL_CREATE })
  async create(@Payload() createSkillDto: CreateSkillDto) {
    return await this.skillService.create(createSkillDto);
  }

  @MessagePattern({ cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_SKILL_FIND_ALL })
  async getAll() {
    return await this.skillService.findAll();
  }

  @MessagePattern({
    cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_SKILL_FIND_BY_TEMPLATES_ID,
  })
  async getByTemplates(@Payload() skills: number[]) {
    return await this.skillService.findByTemplates(skills);
  }
}
