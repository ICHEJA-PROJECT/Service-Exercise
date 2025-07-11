import { Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { TemplateI } from "src/templates/domain/entitiesI/TemplateI";
import { TemplateRepository } from "src/templates/domain/repositories/TemplateRepository";
import { TemplateEntity } from "../entities/template.entity";
import { In, Repository } from "typeorm";
import { CreateTemplateDto } from "../dtos/create-template.dto";
import { TopicEntity } from "src/topics/data/entities/topic.entity";
import { LayoutEntity } from "src/layouts/data/entities/layout.entity";

@Injectable()
export class TemplateRepositoryImpl implements TemplateRepository {
    constructor(
        @Inject(TemplateEntity) private readonly templateRepository: Repository<TemplateEntity>,
        @Inject(TopicEntity) private readonly topicRepository: Repository<TopicEntity>,
        @Inject(LayoutEntity) private readonly layoutRepository: Repository<LayoutEntity>
    ) {}
    
    async create(createTemplateDto: CreateTemplateDto): Promise<TemplateI> {
        try {
            const topic = await this.topicRepository.findOne({where: {id: createTemplateDto.topic}});

            if(!topic) throw new NotFoundException("El tema seleccionado no existe");

            const layout = await this.layoutRepository.findOne({where: {id: createTemplateDto.layout}});

            if(!layout) throw new NotFoundException("La vista seleccionada no existe.");

            const template = this.templateRepository.create({
                title: createTemplateDto.title,
                instructions: createTemplateDto.instructions,
                suggestTime: createTemplateDto.suggestTime,
                attributes: createTemplateDto.attributes,
                topic: topic,
                layout: layout
            });

            return await this.templateRepository.save(template);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async findByTopics(topics: number[]): Promise<TemplateI[]> {
        try {
            const templates = await this.templateRepository.find({where: {topic: In(topics)}});
            return templates;
        } catch (error) {
            throw new NotFoundException(error);
        }
    }

    async findByTopic(topicId: number): Promise<TemplateI[]> {
        try {
            const templates = await this.templateRepository.find({ where: {topic: {id: topicId}}});
            return templates;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}