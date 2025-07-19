import { InjectRepository } from '@nestjs/typeorm';
import { TopicResourceEntity } from '../entities/topic_resource.entity';
import { Repository } from 'typeorm';
import { TopicResourceRepository } from 'src/topics/domain/repositories/TopicResourceRepository';
import { TopicResourceI } from 'src/topics/domain/entititesI/TopicResourceI';
import { CreateTopicResourceDto } from '../dtos/create-topic-resource.dto';
import { HttpStatus, Injectable } from '@nestjs/common';
import { TopicEntity } from '../entities/topic.entity';
import { ResourceEntity } from '../entities/resource.entity';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class TopicResourceRepositoryImpl implements TopicResourceRepository {
  constructor(
    @InjectRepository(TopicResourceEntity)
    private readonly topicResourceRepository: Repository<TopicResourceEntity>,
    @InjectRepository(TopicEntity)
    private readonly topicRepository: Repository<TopicEntity>,
    @InjectRepository(ResourceEntity)
    private readonly resourceRepository: Repository<ResourceEntity>,
  ) {}

  async create(
    createTopicResourceDto: CreateTopicResourceDto,
  ): Promise<TopicResourceI> {
    try {
      const topic = await this.topicRepository.findOne({
        where: { id: createTopicResourceDto.topicId },
      });
      if (!topic) {
        throw new RpcException({
          status: HttpStatus.NOT_FOUND,
          message: 'El tema seleccionado no existe.',
        });
      }

      const resource = await this.resourceRepository.findOne({
        where: { id: createTopicResourceDto.resourceId },
      });
      if (!resource) {
        throw new RpcException({
          status: HttpStatus.NOT_FOUND,
          message: 'El recurso seleccionado no existe.',
        });
      }

      const topicResource = this.topicResourceRepository.create({
        topicId: createTopicResourceDto.topicId,
        topic: topic,
        resourceId: createTopicResourceDto.resourceId,
        resource: resource,
      });

      return await this.topicResourceRepository.save(topicResource);
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  async findAll(): Promise<TopicResourceI[]> {
    try {
      const topicResources = await this.topicResourceRepository.find();
      return topicResources;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }
}
