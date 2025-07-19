import { Controller } from '@nestjs/common';
import { TypeInstructionMediaService } from '../services/type_instruction_media.service';
import { CreateTypeInstructionMediaDto } from '../data/dtos/create-type-instruction-media.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EXERCISE_SERVICE_OPTIONS } from 'src/shared/constants/exercise_service_options';

@Controller('instructions-medias-types')
export class TypeInstructionMediaController {
  constructor(
    private readonly typeInstructionMediaService: TypeInstructionMediaService,
  ) {}

  @MessagePattern({
    cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_TYPE_INSTRUCTION_MEDIA_CREATE,
  })
  async create(
    @Payload() createTypeInstructionMediaDto: CreateTypeInstructionMediaDto,
  ) {
    return await this.typeInstructionMediaService.create(
      createTypeInstructionMediaDto,
    );
  }

  @MessagePattern({
    cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_TYPE_INSTRUCTION_MEDIA_FIND_ALL,
  })
  async getAll() {
    return await this.typeInstructionMediaService.findAll();
  }
}
