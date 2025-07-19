import { Controller } from '@nestjs/common';
import { TypeLayoutService } from '../services/type_layout.service';
import { CreateTypeLayoutDto } from '../data/dtos/create-type-layout.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EXERCISE_SERVICE_OPTIONS } from 'src/shared/constants/exercise_service_options';

@Controller('layouts-types')
export class TypeLayoutController {
  constructor(private readonly typeLayoutService: TypeLayoutService) {}

  @MessagePattern({ cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_TYPE_LAYOUT_CREATE })
  async create(@Payload() createTypeLayoutDto: CreateTypeLayoutDto) {
    return await this.typeLayoutService.create(createTypeLayoutDto);
  }

  @MessagePattern({
    cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_TYPE_LAYOUT_FIND_ALL,
  })
  async getAll() {
    return await this.typeLayoutService.findAll();
  }
}
