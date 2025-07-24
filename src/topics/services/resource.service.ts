import { HttpStatus, Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { TopicService } from "./topic.service";
import { ResourceRepository } from "../domain/repositories/ResourceRepository";
import { ResourceI } from "../domain/entititesI/ResourceI";
import { ResourceRepositoryImpl } from "../data/repositories/resource.repository.impl";
import { CreateResourceDto } from "../data/dtos/create-resource.dto";
import { PreferencesService } from "src/shared/transports/services/preferences.service";
import { RpcException } from "@nestjs/microservices";
import { filterGroups } from "src/shared/utils/filter-groups";

@Injectable()
export class ResourceService {
    constructor(
        private readonly topicService: TopicService, 
        @Inject(ResourceRepositoryImpl) private readonly resourceRepository: ResourceRepository,
        private readonly preferencesService: PreferencesService
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

    async findOne(id: number) {
        try {
            const resource = await this.resourceRepository.findOne(id);
            return resource;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
    
    async findByPupil(pupilId: number, learningPathId: number): Promise<ResourceI[]> {
        try {
            const topics = await this.topicService.findByPupil(pupilId, learningPathId);
            const topicIds = topics.map(topic => topic.id);
            const resources = await this.resourceRepository.findByTopics(topicIds);
            const resourcesIds = resources.map(resource => resource.id);

            const resourcesImpairmentsRes = await this.preferencesService.getResourcesImpairments(learningPathId);
            const resourcesImpairmentsIds = resourcesImpairmentsRes.data;
            
            const resourceIdsFiltered = filterGroups(resourcesIds, resourcesImpairmentsIds);
            const resourcesFiltered = await this.findByIds(resourceIdsFiltered);

            return resourcesFiltered;  
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async findByTopic(topicId: number, learningPathId: number) {
        try {
            const resources = await this.resourceRepository.findByTopic(topicId);
            const resourcesIds = resources.map(resource => resource.id);

            const resourcesImpairmentsRes = await this.preferencesService.getResourcesImpairments(learningPathId);
            const resourcesImpairmentsIds = resourcesImpairmentsRes.data;

            const resourcesIdsFiltered = filterGroups(resourcesIds, resourcesImpairmentsIds);
            const resourcesFiltered = await this.findByIds(resourcesIdsFiltered);

            return resourcesFiltered;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async findByIds(ids: number[]) {
        try {
            return await this.resourceRepository.findByIds(ids);
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }
}