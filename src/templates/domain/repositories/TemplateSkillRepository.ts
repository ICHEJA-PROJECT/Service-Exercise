import { CreateTemplateSkillDto } from "src/templates/data/dtos/create-template-skill.dto";
import { TemplateSkillI } from "../entitiesI/TemplateSkillI";

export interface TemplateSkillRepository {
    create(createTemplateSkillDto: CreateTemplateSkillDto): Promise<TemplateSkillI>;
    findAll(): Promise<TemplateSkillI[]>;
}