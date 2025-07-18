import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UnitRepositoryImpl } from '../data/repositories/unit.repository.impl';
import { UnitRepository } from '../domain/repositories/UnitRepository';
import { CreateUnitDto } from '../data/dtos/create-unit.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UnitService {
  constructor(
    @Inject(UnitRepositoryImpl) private readonly unitRepository: UnitRepository,
  ) {}

  async create(createUnitDto: CreateUnitDto) {
    try {
      const unit = await this.unitRepository.create(createUnitDto);
      return unit;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  async findAll() {
    try {
      const units = await this.unitRepository.findAll();
      return units;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }
}
