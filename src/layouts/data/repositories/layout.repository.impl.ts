import { HttpStatus, Injectable } from '@nestjs/common';
import { LayoutRepository } from 'src/layouts/domain/repositories/LayoutRepository';
import { LayoutEntity } from '../entities/layout.entity';
import { Repository } from 'typeorm';
import { LayoutI } from 'src/layouts/domain/entitiesI/LayoutI';
import { CreateLayoutDto } from '../dtos/create-layout.dto';
import { TypeLayoutEntity } from '../entities/type_layout.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class LayoutRepositoryImpl implements LayoutRepository {
  constructor(
    @InjectRepository(LayoutEntity)
    private readonly layoutRepository: Repository<LayoutEntity>,
    @InjectRepository(TypeLayoutEntity)
    private readonly typeLayoutRepository: Repository<TypeLayoutEntity>,
  ) {}

  async create(createLayout: CreateLayoutDto): Promise<LayoutI> {
    try {
      const typeLayout = await this.typeLayoutRepository.findOne({
        where: { id: createLayout.type_layout_id },
      });
      if (!typeLayout) {
        throw new RpcException({
          status: HttpStatus.NOT_FOUND,
          message: 'El tipo de vista no existe.',
        });
      }
      const layoutSaved = this.layoutRepository.create({
        name: createLayout.name,
        typeLayout: typeLayout,
      });

      return await this.layoutRepository.save(layoutSaved);
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message || 'Error al crear el layout.',
      });
    }
  }

  async findAll(): Promise<Array<LayoutI>> {
    try {
      const layouts = await this.layoutRepository.find();
      return layouts;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }
}
