import { ResourceI } from "src/topics/domain/entititesI/ResourceI";
import { TypeLayoutI } from "./TypeLayoutI";
import { TemplateI } from "src/templates/domain/entitiesI/TemplateI";

export interface LayoutI {
    id: number;
    name: string;
    type_layout_id: TypeLayoutI;
    resources: ResourceI[];
    templates: TemplateI[];
}