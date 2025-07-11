import { ResourceI } from "src/topics/domain/entititesI/ResourceI";
import { ResourceRepository } from "src/topics/domain/repositories/ResourceRepository";
import { ResourceEntity } from "../entities/resource.entity";
import { Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { In, Repository } from "typeorm";
import { CreateResourceDto } from "../dtos/create-resource.dto";
import { LayoutEntity } from "src/layouts/data/entities/layout.entity";

@Injectable()
export class ResourceRepositoryImpl implements ResourceRepository {
    constructor(
        @Inject(ResourceEntity) private readonly resourceRepository: Repository<ResourceEntity>,
        @Inject(LayoutEntity) private readonly layoutRepository: Repository<LayoutEntity>
    ) {}

    async create(createResource: CreateResourceDto): Promise<ResourceI> {
        try {
            const layout = await this.layoutRepository.findOne({where: {id: createResource.layout_id}});

            if(!layout) {
                throw new NotFoundException('No existe la vista requerida para el recurso.');
            }

            const resourceCreated = this.resourceRepository.create({
                content: createResource.content,
                layout: layout
            });

            return await this.resourceRepository.save(resourceCreated);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async findOne(id: number): Promise<ResourceI> {
        try {
            const resource = await this.resourceRepository.findOne({where: {id}});
            if(!resource) throw new NotFoundException(`No existe el recurso con el id: ${id}`);
            return resource;
        } catch (error) {
            throw new InternalServerErrorException
        }
    }

    async findAll(): Promise<ResourceI[]> {
        try {
            const resources = await this.resourceRepository.find();
            return resources;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async findByTopic(idTopic: number): Promise<ResourceI[]> {
        try {
            const resources = await this.resourceRepository.find({where: {topics: {id: idTopic}}});
            return resources;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async findByTopics(idTopics: number[]): Promise<ResourceI[]> {
        try {
            const resources = await this.resourceRepository.find({ where: {topics: {id: In(idTopics)}}, select: {id: true, title: true}});
            return resources;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

}