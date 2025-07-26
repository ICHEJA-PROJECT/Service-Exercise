import { HttpStatus, Injectable } from '@nestjs/common';
import { TopicSequenceRepository } from 'src/topics/domain/repositories/TopicSequenceRepository';
import { TopicSequenceEntity } from '../entities/topic_sequence.entity';
import { Repository } from 'typeorm';
import { TopicSequenceI } from 'src/topics/domain/entititesI/TopicSequenceI';
import { CreateTopicSequenceDto } from '../dtos/create-topic-sequence.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';
import { LearningPathEntity } from '../entities/learning_path.entity';

@Injectable()
export class TopicSequenceRepositoryImpl implements TopicSequenceRepository {
  constructor(
    @InjectRepository(TopicSequenceEntity)
    private readonly topicSequenceRepository: Repository<TopicSequenceEntity>,
    @InjectRepository(LearningPathEntity) 
    private readonly learningPathRepository: Repository<LearningPathEntity>
  ) {}

  async create(
    createTopicSequenceDto: CreateTopicSequenceDto,
  ): Promise<TopicSequenceI> {
    try {
        const learningPath = await this.learningPathRepository.findOne({where:{id: createTopicSequenceDto.learningPathId}});

        if(!learningPath) throw new RpcException({
            message: "No existe la ruta de aprendizaje requerida.",
            status: HttpStatus.NOT_FOUND
        });

        const sequence = this.topicSequenceRepository.create({
            currentTopicId: createTopicSequenceDto.currentTopicId,
            nextTopicId: createTopicSequenceDto.nextTopicId,
            learningPath: learningPath
        });

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
              relations: [
                "currentTopic", 
                "nextTopic", 
                "learningPath"
              ]
            });
            return sequences;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  async findByLearningPath(learningPathId: number): Promise<TopicSequenceI[]> {
    try {
        const topicSequences = await this.topicSequenceRepository.find({
            where: {
                learningPath:{id:learningPathId}
            },
            order: { currentTopicId: "ASC", nextTopicId: "ASC"},
            relations: ["nextTopic", "currentTopic"],
        });
        return topicSequences;
    } catch (error) {
        throw new RpcException({
            message: error.message,
            status: HttpStatus.BAD_REQUEST
        });
    }
  }
}
