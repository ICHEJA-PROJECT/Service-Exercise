import { CreateTemplateDto } from "src/templates/data/dtos/create-template.dto";
import { TemplateI } from "../entitiesI/TemplateI";

export interface TemplateRepository {
    create(createTemplateDto: CreateTemplateDto): Promise<TemplateI>;
    findByTopics(topicIds: number[]): Promise<TemplateI[]>;
    findByTopic(topicId: number): Promise<TemplateI[]>;
    findAll(): Promise<TemplateI[]>;
    findOne(id: number): Promise<TemplateI>;
}