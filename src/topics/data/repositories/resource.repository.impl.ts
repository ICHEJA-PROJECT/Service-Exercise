import { ResourceI } from 'src/topics/domain/entititesI/ResourceI';
import { ResourceRepository } from 'src/topics/domain/repositories/ResourceRepository';
import { ResourceEntity } from '../entities/resource.entity';
import { HttpStatus, Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { CreateResourceDto } from '../dtos/create-resource.dto';
import { LayoutEntity } from 'src/layouts/data/entities/layout.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ResourceRepositoryImpl implements ResourceRepository {
  constructor(
    @InjectRepository(ResourceEntity)
    private readonly resourceRepository: Repository<ResourceEntity>,
    @InjectRepository(LayoutEntity)
    private readonly layoutRepository: Repository<LayoutEntity>,
  ) {}

  async create(createResource: CreateResourceDto): Promise<ResourceI> {
    try {
      const layout = await this.layoutRepository.findOne({
        where: { id: createResource.layout_id },
      });

      if (!layout) {
        throw new RpcException({
          status: HttpStatus.BAD_REQUEST,
          message: 'No existe la vista requerida para el recurso.',
        });
      }

      const resourceCreated = this.resourceRepository.create({
        title: createResource.title,
        content: createResource.content,
        layout: layout,
      });

      return await this.resourceRepository.save(resourceCreated);
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  async findOne(id: number): Promise<ResourceI> {
    try {
      const resource = await this.resourceRepository.findOne({ where: { id } });
      if (!resource) {
        throw new RpcException({
          status: HttpStatus.BAD_REQUEST,
          message: `No existe el recurso con el id: ${id}`,
        });
      }
      return resource;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  async findAll(): Promise<ResourceI[]> {
    try {
      const resources = await this.resourceRepository.find();
      return resources;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  async findByTopic(idTopic: number): Promise<ResourceI[]> {
    try {
      const resources = await this.resourceRepository.find({
        where: { topics: { id: idTopic } },
      });
      return resources;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  async findByTopics(idTopics: number[]): Promise<ResourceI[]> {
    try {
      const resources = await this.resourceRepository.find({
        where: { topics: { id: In(idTopics) } },
        select: { id: true, title: true },
      });
      return resources;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }
}
