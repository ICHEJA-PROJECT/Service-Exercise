import { TemplateInstructionMediaI } from "../entitiesI/TemplateInstructionMediaI";
import { TemplateInstructionMedia } from "../entities/TemplateInstructionMedia";

export interface TemplateInstructionMediaRepository {
    create(templateInstructionMedia: TemplateInstructionMedia): Promise<TemplateInstructionMediaI>;
    findAll(): Promise<TemplateInstructionMediaI[]>;
}