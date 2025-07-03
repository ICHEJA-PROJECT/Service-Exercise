import { Template } from "../entities/Template";
import { TemplateI } from "../entitiesI/TemplateI";


export interface TemplateRepository {
    create(template: Template): Promise<TemplateI>;
}