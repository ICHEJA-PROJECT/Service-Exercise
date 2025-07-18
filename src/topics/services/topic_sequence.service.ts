import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { TopicSequenceRepositoryImpl } from '../data/repositories/topic_sequence.repository.impl';
import { TopicSequenceRepository } from '../domain/repositories/TopicSequenceRepository';
import { CreateTopicSequenceDto } from '../data/dtos/create-topic-sequence.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class TopicSequenceService {
  constructor(
    @Inject(TopicSequenceRepositoryImpl)
    private readonly topicSequenceRepository: TopicSequenceRepository,
  ) {}

  async create(createTopicSequenceDto: CreateTopicSequenceDto) {
    try {
      const topicSequence = await this.topicSequenceRepository.create(
        createTopicSequenceDto,
      );
      return topicSequence;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  async findAll() {
    try {
      const topicSequences = await this.topicSequenceRepository.findAll();
      return topicSequences;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }
}
