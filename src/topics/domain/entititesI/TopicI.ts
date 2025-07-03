import { TemplateI } from "src/templates/domain/entitiesI/TemplateI";
import { ResourceI } from "./ResourceI";
import { UnitI } from "./UnitI";

export interface TopicI {
    id: number;
    name: string;
    unit_id: UnitI;
    resources: ResourceI[];
    templates: TemplateI[];
}