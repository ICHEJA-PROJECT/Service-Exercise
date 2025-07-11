import { TemplateI } from "src/templates/domain/entitiesI/TemplateI";

export interface ExerciseI {
    id: number;
    context: object;
    template: TemplateI;
}