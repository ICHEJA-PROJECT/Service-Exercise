import { TypeInstructionMediaI } from 'src/templates/domain/entitiesI/TypeInstructionMediaI';
import { TypeInstructionMediaRepository } from 'src/templates/domain/repositories/TypeInstructionMediaRepository';
import { CreateTypeInstructionMediaDto } from '../dtos/create-type-instruction-media.dto';
import { HttpStatus, Injectable } from '@nestjs/common';
import { TypeInstructionMediaEntity } from '../entities/type_instruction_media.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class TypeInstructionMediaRepositoryImpl
  implements TypeInstructionMediaRepository
{
  constructor(
    @InjectRepository(TypeInstructionMediaEntity)
    private readonly typeInstructionMediaRepository: Repository<TypeInstructionMediaEntity>,
  ) {}

  async create(
    createTypeInstructionMediaDto: CreateTypeInstructionMediaDto,
  ): Promise<TypeInstructionMediaI> {
    try {
      const type = this.typeInstructionMediaRepository.create(
        createTypeInstructionMediaDto,
      );
      return await this.typeInstructionMediaRepository.save(type);
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  async findAll(): Promise<TypeInstructionMediaI[]> {
    try {
      const types = await this.typeInstructionMediaRepository.find();
      return types;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }
}
