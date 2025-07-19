import { HttpStatus, Injectable } from '@nestjs/common';
import { TopicSequenceRepository } from 'src/topics/domain/repositories/TopicSequenceRepository';
import { TopicSequenceEntity } from '../entities/topic_sequence.entity';
import { Repository } from 'typeorm';
import { TopicSequenceI } from 'src/topics/domain/entititesI/TopicSequenceI';
import { CreateTopicSequenceDto } from '../dtos/create-topic-sequence.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class TopicSequenceRepositoryImpl implements TopicSequenceRepository {
  constructor(
    @InjectRepository(TopicSequenceEntity)
    private readonly topicSequenceRepository: Repository<TopicSequenceEntity>,
  ) {}

  async create(
    createTopicSequenceDto: CreateTopicSequenceDto,
  ): Promise<TopicSequenceI> {
    try {
      const sequence = this.topicSequenceRepository.create(
        createTopicSequenceDto,
      );
      return this.topicSequenceRepository.save(sequence);
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  async findAll(): Promise<TopicSequenceI[]> {
    try {
      const sequences = await this.topicSequenceRepository.find({
        relations: ['currentTopic', 'nextTopic'],
      });
      return sequences;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }
}
