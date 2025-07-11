import { CreateTemplateDto } from "src/templates/data/dtos/create-template.dto";
import { TemplateI } from "../entitiesI/TemplateI";
import { GetTemplatesByTopicsDto } from "src/templates/data/dtos/get-templates-by-topics.dto";

export interface TemplateRepository {
    create(createTemplateDto: CreateTemplateDto): Promise<TemplateI>;
    findByTopics(topicIds: number[]): Promise<TemplateI[]>;
    findByTopic(topicId: number): Promise<TemplateI[]>;
}