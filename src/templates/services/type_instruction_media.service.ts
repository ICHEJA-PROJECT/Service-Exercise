import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { TypeInstructionMediaRepositoryImpl } from '../data/repositories/type_instruction_media.repository.impl';
import { TypeInstructionMediaRepository } from '../domain/repositories/TypeInstructionMediaRepository';
import { CreateTypeInstructionMediaDto } from '../data/dtos/create-type-instruction-media.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class TypeInstructionMediaService {
  constructor(
    @Inject(TypeInstructionMediaRepositoryImpl)
    private readonly typeInstructionMediaRepository: TypeInstructionMediaRepository,
  ) {}

  async create(createTypeInstructionMediaDto: CreateTypeInstructionMediaDto) {
    try {
      const typeInstructionMedia =
        await this.typeInstructionMediaRepository.create(
          createTypeInstructionMediaDto,
        );
      return typeInstructionMedia;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  async findAll() {
    try {
      const typeInstructionMedias =
        await this.typeInstructionMediaRepository.findAll();
      return typeInstructionMedias;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }
}
