import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { TopicService } from './topic.service';
import { ResourceRepository } from '../domain/repositories/ResourceRepository';
import { ResourceI } from '../domain/entititesI/ResourceI';
import { ResourceRepositoryImpl } from '../data/repositories/resource.repository.impl';
import { CreateResourceDto } from '../data/dtos/create-resource.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ResourceService {
  constructor(
    private readonly topicService: TopicService,
    @Inject(ResourceRepositoryImpl)
    private readonly resourceRepository: ResourceRepository,
  ) {}

  async create(createResourceDto: CreateResourceDto) {
    try {
      const resource = await this.resourceRepository.create(createResourceDto);
      return resource;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  async findAll() {
    try {
      const resources = await this.resourceRepository.findAll();
      return resources;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  async findOne(id: number) {
    try {
      const resource = await this.resourceRepository.findOne(id);
      return resource;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  async findByPupil(pupilId: number, learningPathId: number): Promise<ResourceI[]> {
    try {
      console.log(`id pupil: ${pupilId}`);
      const topics = await this.topicService.findByPupil(pupilId, learningPathId);
      const topicIds = topics.map((topic) => topic.id);
      const resources = await this.resourceRepository.findByTopics(topicIds);
      return resources;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  async findByTopic(topicId: number) {
    try {
      const resources = await this.resourceRepository.findByTopic(topicId);
      return resources;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }
}
