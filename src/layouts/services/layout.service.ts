import { HttpStatus, Inject } from '@nestjs/common';
import { CreateLayoutDto } from '../data/dtos/create-layout.dto';
import { LayoutRepositoryImpl } from '../data/repositories/layout.repository.impl';
import { LayoutRepository } from '../domain/repositories/LayoutRepository';
import { RpcException } from '@nestjs/microservices';

export class LayoutService {
  constructor(
    @Inject(LayoutRepositoryImpl)
    private readonly layoutRepository: LayoutRepository,
  ) {}

  async create(createLayoutDto: CreateLayoutDto) {
    try {
      const layout = await this.layoutRepository.create(createLayoutDto);
      return layout;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  async findAll() {
    try {
      const layouts = await this.layoutRepository.findAll();
      return layouts;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }
}
