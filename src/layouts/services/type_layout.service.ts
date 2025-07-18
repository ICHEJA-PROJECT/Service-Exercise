import { HttpStatus, Inject } from '@nestjs/common';
import { CreateTypeLayoutDto } from '../data/dtos/create-type-layout.dto';
import { TypeLayoutRepositoryImpl } from '../data/repositories/type_layout.repository.impl';
import { TypeLayoutRepository } from '../domain/repositories/TypeLayoutRepository';
import { RpcException } from '@nestjs/microservices';

export class TypeLayoutService {
  constructor(
    @Inject(TypeLayoutRepositoryImpl)
    private readonly typeLayoutRepository: TypeLayoutRepository,
  ) {}

  async create(createTypeLayoutDto: CreateTypeLayoutDto) {
    try {
      const typeLayout =
        await this.typeLayoutRepository.create(createTypeLayoutDto);
      return typeLayout;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  async findAll() {
    try {
      const typeLayouts = await this.typeLayoutRepository.findAll();
      return typeLayouts;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }
}
