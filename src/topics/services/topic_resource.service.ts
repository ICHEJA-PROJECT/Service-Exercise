import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { TopicResourceRepositoryImpl } from '../data/repositories/topic_resource.repository.impl';
import { TopicResourceRepository } from '../domain/repositories/TopicResourceRepository';
import { CreateTopicResourceDto } from '../data/dtos/create-topic-resource.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class TopicResourceService {
  constructor(
    @Inject(TopicResourceRepositoryImpl)
    private readonly topicResourcRepository: TopicResourceRepository,
  ) {}

  async create(createTopicResourceDto: CreateTopicResourceDto) {
    try {
      const topicResource = await this.topicResourcRepository.create(
        createTopicResourceDto,
      );
      return topicResource;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  async findAll() {
    try {
      const topicResources = await this.topicResourcRepository.findAll();
      return topicResources;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }
}
