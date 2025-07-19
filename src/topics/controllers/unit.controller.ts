import { Controller } from '@nestjs/common';
import { UnitService } from '../services/unit.service';
import { CreateUnitDto } from '../data/dtos/create-unit.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EXERCISE_SERVICE_OPTIONS } from 'src/shared/constants/exercise_service_options';

@Controller('units')
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  @MessagePattern({ cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_UNIT_CREATE })
  async create(@Payload() createUnitDto: CreateUnitDto) {
    return await this.unitService.create(createUnitDto);
  }

  @MessagePattern({ cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_UNIT_FIND_ALL })
  async getAll() {
    return await this.unitService.findAll();
  }
}
