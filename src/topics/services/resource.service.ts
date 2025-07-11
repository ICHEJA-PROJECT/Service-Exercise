import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { TopicService } from "./topic.service";
import { ResourceRepository } from "../domain/repositories/ResourceRepository";
import { ResourceI } from "../domain/entititesI/ResourceI";
import { ResourceRepositoryImpl } from "../data/repositories/resource.repository.impl";
import { CreateResourceDto } from "../data/dtos/create-resource.dto";

@Injectable()
export class ResourceService {
    constructor(
        private readonly topicService: TopicService, 
        @Inject(ResourceRepositoryImpl) private readonly resourceRepository: ResourceRepository
    ) {}

    async create(createResourceDto: CreateResourceDto) {
        try {
            const resource = await this.resourceRepository.create(createResourceDto);
            return resource;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async findAll() {
        try {
            const resources = await this.resourceRepository.findAll();
            return resources;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
    
    async findByPupil(pupilId: number): Promise<ResourceI[]> {
        try {
            const topics = await this.topicService.findByPupil(pupilId);
            const topicIds = topics.map(topic => topic.id);
            const resources = await this.resourceRepository.findByTopics(topicIds);
            return resources;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async findByTopic(topicId: number) {
        try {
            const resources = await this.findByTopic(topicId);
            return resources;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}