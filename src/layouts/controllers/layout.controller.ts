import { Controller } from '@nestjs/common';
import { LayoutService } from '../services/layout.service';
import { CreateLayoutDto } from '../data/dtos/create-layout.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EXERCISE_SERVICE_OPTIONS } from 'src/shared/constants/exercise_service_options';

@Controller('layouts')
export class LayoutController {
  constructor(private readonly layoutService: LayoutService) {}

  @MessagePattern({ cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_LAYOUT_CREATE })
  async create(@Payload() createLayoutDto: CreateLayoutDto) {
    return await this.layoutService.create(createLayoutDto);
  }

  @MessagePattern({ cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_LAYOUT_FIND_ALL })
  async getAll() {
    return await this.layoutService.findAll();
  }
}
