import { CreateTemplateInstructionMediaDto } from "src/templates/data/dtos/create-template-instruction-media.dto";
import { TemplateInstructionMediaI } from "../entitiesI/TemplateInstructionMediaI";

export interface TemplateInstructionMediaRepository {
    create(createTemplateInstructionMediaDto: CreateTemplateInstructionMediaDto): Promise<TemplateInstructionMediaI>;
    findAll(): Promise<TemplateInstructionMediaI[]>;
}