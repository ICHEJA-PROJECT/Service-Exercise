import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { TopicService } from './topic.service';
import { ResourceRepository } from '../domain/repositories/ResourceRepository';
import { ResourceI } from '../domain/entititesI/ResourceI';
import { ResourceRepositoryImpl } from '../data/repositories/resource.repository.impl';
import { CreateResourceDto } from '../data/dtos/create-resource.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { PREFERENCES_SERVICE_OPTIONS } from 'src/shared/constants/preferences_service_options';
import { filterGroups } from 'src/shared/utils/filter-groups';

@Injectable()
export class ResourceService {
  constructor(
    private readonly topicService: TopicService,
    @Inject(ResourceRepositoryImpl)
    private readonly resourceRepository: ResourceRepository,
    @Inject(PREFERENCES_SERVICE_OPTIONS.PREFERENCES_SERVICE_NAME)
    private readonly preferencesClient: ClientProxy
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
      const resourcesIds = resources.map(resource => resource.id);
      const resourcesImpairmentsRes = await firstValueFrom(
        this.preferencesClient
          .send (
            { cmd: PREFERENCES_SERVICE_OPTIONS.RESOURCE_IMPAIRMENT_FIND_BY_LEARNING_PATH },
            {
              id: learningPathId
            }
          )
          .pipe(catchError(error => {
            throw new RpcException({
              message: error.message,
              status: HttpStatus.BAD_REQUEST,
            });
          }))
      );
      const resourcesImpairmentsIds = resourcesImpairmentsRes.data;
      const resourcesIdsFiltered = filterGroups(resourcesIds, resourcesImpairmentsIds);
      const resourcesFiltered = await this.findByIds(resourcesIdsFiltered);

      return resourcesFiltered;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  async findByTopic(topicId: number, learningPathId: number) {
    try {
      const resources = await this.resourceRepository.findByTopic(topicId);
      const resourcesIds = resources.map(resource => resource.id);

      const resourcesImpairmentRes = await firstValueFrom(
        this.preferencesClient
          .send(
            { cmd: PREFERENCES_SERVICE_OPTIONS.RESOURCE_IMPAIRMENT_FIND_BY_LEARNING_PATH }, 
            { id: learningPathId }
          )
          .pipe(catchError(error => {
            throw new RpcException({
              message: error.message,
              status: HttpStatus.BAD_REQUEST
            });
          }))
      );

      const resourcesImpairmentsIds = resourcesImpairmentRes.data;

      const resourcesIdsFiltered = filterGroups(resourcesIds, resourcesImpairmentsIds);

      const resourcesFiltered = await this.findByIds(resourcesIdsFiltered);

      return resourcesFiltered;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
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
