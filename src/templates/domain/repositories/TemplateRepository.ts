import { CreateTemplateDto } from "src/templates/data/dtos/create-template.dto";
import { TemplateI } from "../entitiesI/TemplateI";

export interface TemplateRepository {
    create(createTemplateDto: CreateTemplateDto): Promise<TemplateI>;
    findByTopics(topics: number[]): Promise<TemplateI[]>;
    findByTopic(topicId: number): Promise<TemplateI[]>;
}