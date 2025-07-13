import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { TopicI } from "src/topics/domain/entititesI/TopicI";
import { TopicRepository } from "src/topics/domain/repositories/TopicRepository";
import { UnitEntity } from "../entities/unit.entity";
import { In, Repository } from "typeorm";
import { TopicEntity } from "../entities/topic.entity";
import { CreateTopicDto } from "../dtos/create-topic.dto";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class TopicRepositoryImpl implements TopicRepository {
    constructor(
        @InjectRepository(TopicEntity) private readonly topicRepository: Repository<TopicEntity>, 
        @InjectRepository(UnitEntity) private readonly unitRepository: Repository<UnitEntity>
    ) {}

    async create(createTopic: CreateTopicDto): Promise<TopicI> {
        try {
            const unit = await this.unitRepository.findOne({ where: { id: createTopic.unit_id}});

            if(!unit) throw new NotFoundException('La unidad no existe.');

            const topicCreated = this.topicRepository.create({
                name: createTopic.name,
                unit: unit
            });

            return await this.topicRepository.save(topicCreated);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async findOne(id: number): Promise<TopicI> {
        try {
            const topic  = await this.topicRepository.findOne({where: {id}, relations: {
                templates: true
            }});

            if(!topic) throw new NotFoundException('No existe el tema.');

            return topic;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async findByIds(ids: number[]): Promise<TopicI[]> {
        try {
            if(!ids || ids.length === 0) {
                return []
            }

            const topics = await this.topicRepository.find({where: {id: In(ids)}, select: {id: true, name: true}});

            return topics;

        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async findAll(): Promise<TopicI[]> {
        try {
            const topics = await this.topicRepository.find();
            return topics;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}