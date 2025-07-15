import { CreateSkillDto } from "src/templates/data/dtos/create-skill.dto";
import { SkillI } from "../entitiesI/SkillI";

export interface SkillRepository {
    create(createSkillDto: CreateSkillDto): Promise<SkillI>;
    findAll(): Promise<SkillI[]>;
    findByTemplates(templateIds: number[]): Promise<SkillI[]>;
}