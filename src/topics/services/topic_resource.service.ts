import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { TopicResourceRepositoryImpl } from "../data/repositories/topic_resource.repository.impl";
import { TopicResourceRepository } from "../domain/repositories/TopicResourceRepository";
import { CreateTopicResourceDto } from "../data/dtos/create-topic-resource.dto";

@Injectable()
export class TopicResourceService {
    constructor(@Inject(TopicResourceRepositoryImpl) private readonly topicResourcRepository: TopicResourceRepository) {}

    async create(createTopicResourceDto: CreateTopicResourceDto) {
        try {
            const topicResource = await this.topicResourcRepository.create(createTopicResourceDto);
            return topicResource;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async findAll() {
        try {
            const topicResources = await this.topicResourcRepository.findAll();
            return topicResources;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}