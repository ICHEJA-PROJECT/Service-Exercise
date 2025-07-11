import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { TopicSequenceRepositoryImpl } from "../data/repositories/topic_sequence.repository.impl";
import { TopicSequenceRepository } from "../domain/repositories/TopicSequenceRepository";
import { CreateTopicSequenceDto } from "../data/dtos/create-topic-sequence.dto";

@Injectable()
export class TopicSequenceService {
    constructor(@Inject(TopicSequenceRepositoryImpl) private readonly topicSequenceRepository: TopicSequenceRepository) {}

    async create(createTopicSequenceDto: CreateTopicSequenceDto) {
        try {
            const topicSequence = await this.topicSequenceRepository.create(createTopicSequenceDto);
            return topicSequence;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async findAll() {
        try {
            const topicSequences = await this.topicSequenceRepository.findAll();
            return topicSequences;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}